import React, { useState } from 'react';
import style from './listacategoria.module.css';
import Header from './header'; 
import Footer from './footer';

function ListaCategoria() {
  const [categorias, setCategorias] = useState([
    'Enlatados',
    'Granos y cereales',
    'Lácteos',
    'Carnes y embutidos'
  ]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [categoriaEditada, setCategoriaEditada] = useState('');

  const agregarCategoria = () => {
    if (nuevaCategoria.trim()) {
      setCategorias([...categorias, nuevaCategoria]);
      setNuevaCategoria('');
    }
  };

  const borrarCategoria = (index) => {
    const nuevasCategorias = categorias.filter((_, i) => i !== index);
    setCategorias(nuevasCategorias);
  };

  const iniciarEdicion = (index) => {
    setEditandoIndex(index);
    setCategoriaEditada(categorias[index]);
  };

  const guardarEdicion = () => {
    const nuevasCategorias = [...categorias];
    nuevasCategorias[editandoIndex] = categoriaEditada;
    setCategorias(nuevasCategorias);
    setEditandoIndex(null);
    setCategoriaEditada('');
  };
    return (
<>
  <Header />
    <div className={style.adminContainer}>
      <h2>Administrar Categorías</h2>
      <div className={style.formGroup}>
        <input
          type="text"
          placeholder="Nueva categoría"
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
        />
        <button onClick={agregarCategoria}>Agregar</button>
      </div>
      <ul className={style.lista}>
        {categorias.map((cat, index) => (
          <li key={index}>
            {editandoIndex === index ? (
              <>
                <input
                  type="text"
                  value={categoriaEditada}
                  onChange={(e) => setCategoriaEditada(e.target.value)}
                />
                <button onClick={guardarEdicion}>Guardar</button>
              </>
            ) : (
              <>
                {cat}
                <button onClick={() => iniciarEdicion(index)}>Editar</button>
                <button onClick={() => borrarCategoria(index)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  <Footer />
</>
  );
}
export default ListaCategoria;
