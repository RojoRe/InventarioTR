import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Disenos/CatalogoDi.css";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosResponse, categoriasResponse] = await Promise.all([
          axios.get('https://apiinventario-rilt.onrender.com/api/productos'),
          axios.get('https://apiinventario-rilt.onrender.com/api/categorias'),
        ]);
        setProductos(productosResponse.data);
        setCategorias(categoriasResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const productosPorCategoria = categorias.reduce((acc, categoria) => {
    acc[categoria.id] = productos.filter(producto => producto.categoria_id === categoria.id);
    return acc;
  }, {});

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (isConfirmed) {
      try {
        await axios.delete(`https://apiinventario-rilt.onrender.com/api/productos/${id}`);
        setProductos(productos.filter(producto => producto.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = (producto) => {
    navigate(`/Edit/${producto.id}`); 
  };

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      {categorias.map(categoria => (
        <div key={categoria.id}>
          <h3>{categoria.nombre}</h3>
          <div className="catalogo-container">
            {productosPorCategoria[categoria.id]?.length > 0 ? (
              productosPorCategoria[categoria.id].map(producto => (
                <div key={producto.id} className="producto-card">
                  <div className="producto-info">
                    <h4>{producto.nombre}</h4>
                    <p>{producto.descripcion}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p>Stock: {producto.stock}</p>
                    {producto.foto && <img src={`https://apiinventario-rilt.onrender.com/uploads/${producto.foto}`} alt={producto.nombre} />}
                    <button onClick={() => handleEdit(producto)}>Editar</button>
                    <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay productos en esta categoría.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalogo;
