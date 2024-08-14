import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`https://api-invertariostuizakrojo.onrender.com/api/productos/${id}`);
        const productoData = response.data;
        setProducto(productoData);
        setNombre(productoData.nombre);
        setPrecio(productoData.precio);
        setStock(productoData.stock);
        setDescripcion(productoData.descripcion);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProducto();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (nombre !== producto.nombre) formData.append('nombre', nombre);
    if (precio !== producto.precio) formData.append('precio', precio);
    if (stock !== producto.stock) formData.append('stock', stock);
    if (descripcion !== producto.descripcion) formData.append('descripcion', descripcion);
    if (foto) formData.append('foto', foto);

    try {
      await axios.put(`https://apiinventario-rilt.onrender.com/api/productos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/Catalogo'); 
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <div className="edit-form">
      <h3>Editar Producto</h3>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label>Foto:</label>
          <input
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
};

export default Edit;
