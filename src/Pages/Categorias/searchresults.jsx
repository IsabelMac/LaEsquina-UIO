import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import style from './../Categorias/categorias.module.css';
import Header from './header';
import Footer from './footer';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const SearchResults = () => {
const [productos, setProductos] = useState([]);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null);
const location = useLocation();
const query = new URLSearchParams(location.search).get('query')?.toLowerCase() || '';

useEffect(() => {
  fetch('https://mock.apidog.com/m1/920738-903315-default/market/producto')
    .then(res => res.json())
    .then(data => {
      setProductos(data);
      setError(null);
    })
    .catch(err => {
      console.error('Error al cargar productos:', err);
      setError('No se pudieron cargar los productos.');
    })
    .finally(() => setCargando(false));
  }, []);
const resultados = productos.filter(p =>
  p.producto.toLowerCase().includes(query)
  );
return (
  <>
    <Header />
      <form className={style.buscador} method="get" action="/search">
        <input
          className={style.textoin}
          type="search"
          name="query"
          placeholder="Ingrese el nombre del producto"
        />
        <button className={style.btn}>Buscar</button>
      </form>
      <div className="container mt-4">
        <h2>Resultados para: <em>{query}</em></h2>
      {cargando && <p>Cargando...</p>}
      {error && <p className={style.error}>{error}</p>}
      <div className="row g-4">
            {resultados.length === 0 && !cargando && <p>No se encontraron productos.</p>}
            {resultados.map(prod => (
              <div key={prod.id} className="col-md-3">
                <Popup
                  trigger={
                    <div className="card p-3 shadow-sm" style={{ cursor: 'pointer' }}>
                      <h6>{prod.producto}</h6>
                      <img src={prod.cover} className="card-img-top" alt={prod.producto} />
                      <hr className={style.hr} />
                      <p>Precio: ${prod.precio}</p>
                      <p>
                        Este producto se encuentra en el pasillo <strong>0{prod.pasillo}</strong>, la percha <strong>0{prod.percha}</strong> en el nivel <strong>0{prod.nivel}</strong>
                      </p>
                    </div>
                  }
                  modal
                  nested
                  >
                  {close => (
                    <div className={style.contenedor}>
                      <div className={style.columnaImagen}>
                        <img src={prod.cover} alt={prod.producto} className={style.imgtam} />
                      </div>
                      <div className={style.columnaTexto}>
                        <h4 className={style.nombrep}>{prod.producto}</h4>
                        <p><strong>Precio:</strong> ${prod.precio}</p>
                        <p>
                          Este producto se encuentra en el pasillo <strong>0{prod.pasillo}</strong>, la percha <strong>0{prod.percha}</strong> en el nivel <strong>0{prod.nivel}</strong>
                        </p>
                        <button className={style.btn} onClick={close}>Cerrar</button>
                      </div>
                    </div>
                  )}
                </Popup>
            </div>
          ))}
        </div>
      </div>
    <Footer />
    </>
  );
};
export default SearchResults;
