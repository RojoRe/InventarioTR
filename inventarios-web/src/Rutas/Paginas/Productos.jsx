import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Disenos/ProductoDi.css'; 

const Productos = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [foto, setFoto] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]);

 
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get('https://api-invertariostuizakrojo.onrender.com/api/proveedores');
        setProveedores(response.data);
      } catch (error) {
        console.error('Error fetching proveedores:', error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get('https://api-invertariostuizakrojo.onrender.com/api/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error fetching categorias:', error);
      }
    };

    fetchProveedores();
    fetchCategorias();
  }, []);

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('stock', stock);
    formData.append('descripcion', descripcion);
    formData.append('categoria_id', categoria); 
    formData.append('proveedor_id', proveedor); 
    formData.append('foto', foto);

    try {
      const response = await axios.post('https://apiinventario-rilt.onrender.com/api/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMensaje('Producto creado con éxito');
      setNombre('');
      setPrecio('');
      setStock('');
      setDescripcion('');
      setCategoria('');
      setProveedor('');
      setFoto(null);
    } catch (error) {
      setMensaje('Error al crear el producto');
      console.error('Error al crear el producto:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Crear Producto</h2>
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Precio:</label>
          <input 
            type="number" 
            value={precio} 
            onChange={(e) => setPrecio(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Stock:</label>
          <input 
            type="number" 
            value={stock} 
            onChange={(e) => setStock(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Categoría:</label>
          <select 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)} 
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Proveedor:</label>
          <select 
            value={proveedor} 
            onChange={(e) => setProveedor(e.target.value)} 
            required
          >
            <option value="">Selecciona un proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Foto:</label>
          <input 
            type="file" 
            onChange={handleFileChange} 
            required 
          />
        </div>
        <button type="submit">Crear Producto</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
};

export default Productos;
