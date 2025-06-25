import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './../Categorias/categorias.module.css';
import Header from './header'; 
import Footer from './footer';

const Categorias = () => {
const [categorias, setCategorias] = useState([]);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://mock.apidog.com/m1/920738-903315-default/categorias')
      .then(res => res.json())
      .then(data => {
        setCategorias(data);
        setError(null);
      })
      .catch(error => {
        console.error('Error al cargar categorías:', error);
        setError('No se pudieron cargar las categorías.');
      })
      .finally(() => setCargando(false)
      );
    }, []);
  return (
    <>
    <Header />
    <div className={style.categorias}>
      <form className={style.buscador} method="get" action="/search">
        <input
          className={style.textoin}
          type="search"
          name="query"
          placeholder="Ingrese el nombre del producto"
        />
        <button className={style.btn}>Buscar</button>
      </form>
    {cargando && <p>Cargando categorías...</p>}
    {error && <p className={style.error}>{error}</p>}
      <div className="container mt-4">
        <div className="row g-4">{categorias.map((categorias) => (
          <div key={categorias.id} className="col-md-3">
            <Link to={`/categoria/${categorias.id}`}>
              <div className={style.tarjeta}>
                <img src={categorias.cover} className="card-img-top" alt={categorias.cover} />
                <p className="card-title">{categorias.nombrecat}</p>
              </div>
            </Link>
          </div>
            ))}
        </div>
      </div>    
    </div>
<Footer />
    </>
  );
  };
export default Categorias;