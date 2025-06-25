import { useState } from 'react';{/*
import style from './crearProducto.module.css';*/}
import Header from './../Categorias/header';
import Footer from './../Categorias/footer';

const CrearProducto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    pasillo: '',
    percha: '',
    nivel: '',
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormData((prev) => ({ ...prev, imagen: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('https://mock.apidog.com/m1/920738-903315-default/productos', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) throw new Error('Error al crear el producto');

      alert('Producto creado exitosamente');
    } catch (error) {
      console.error(error);
      alert('Hubo un error al crear el producto');
    }
  };

  return (
    <>
      <Header />
      <div >
        <h2>Crear Producto</h2>
        <form onSubmit={handleSubmit}>
          <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
          <input name="precio" placeholder="Precio" type="number" onChange={handleChange} required />
          <select name="categoria" onChange={handleChange} required>
            <option value="">Seleccione categoría</option>
            <option value="bebidas">Bebidas</option>
            <option value="snacks">Snacks</option>
            <option value="lacteos">Lácteos</option>
          </select>
          <input name="pasillo" placeholder="Pasillo" onChange={handleChange} required />
          <input name="percha" placeholder="Percha" onChange={handleChange} required />
          <input name="nivel" placeholder="Nivel" onChange={handleChange} required />
          <input name="imagen" type="file" accept="image/*" onChange={handleChange} required />
          <button type="submit">Crear</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CrearProducto;
