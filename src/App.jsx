import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Categorias from './Pages/Categorias/indexcategorias.jsx';
import Login from './Pages/Login/indexlogin.jsx';
import Register from './Pages/Register/indexregister.jsx';
import ListaCategoria from './Pages/Categorias/listacategoria.jsx';
import ProductosPorCategoria from './Pages/Categorias/productosxcategoria.jsx';
import SearchResults from './Pages/Categorias/SearchResults.jsx';
import Map from './Pages/Categorias/map.jsx';
import CrearProducto from './Pages/Categorias/crearproducto.jsx';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Categorias />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/listacategoria" element={<ListaCategoria />} />
      <Route path="/categoria/:idcat" element={<ProductosPorCategoria />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/map" element={<Map />} />
      <Route path="/crearproducto" element={<CrearProducto />} />
    </Routes>
  );
}
export default App;