
{
  /*{/*import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategorias } from '../api.jsx';
import Header from './header.jsx';
import Footer from './footer.jsx';

const ProductosPorCategoria = () => {
  const { nombre } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getCategorias().then(data => {
      const filtrados = data.filter(prod => prod.categoria === nombre);
      setProductos(filtrados);
    });
  }, [nombre]);

  return (
    <>
      <Header />
      <div style={{ padding: '1rem' }}>
        <h2>Productos en categoría: {nombre}</h2>
        
        <button
          onClick={() => navigate('/')}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          ← Volver a Categorías
        </button>

        {productos.length === 0 ? (
          <p>No hay productos en esta categoría.</p>
        ) : (
          <div className="productos-list">
            {productos.map(producto => (
              <div key={producto.id} className="producto-card">
                <h3>{producto.producto}</h3>
                <p>Precio: ${producto.precio}</p>
                <p>Ubicación: Pasillo {producto.pasillo}, Percha {producto.percha}, Nivel {producto.nivel}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default ProductosPorCategoria;
*/}

{/*
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCat = await fetch('https://mock.apidog.com/m1/920738-903315-default/categorias');
        const categoriasData = await resCat.json();
        const resProd = await fetch('https://mock.apidog.com/m1/920738-903315-default/market');
        const productosData = await resProd.json();

        setCategorias(categoriasData);
        setProductos(productosData);
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError('No se pudieron cargar los datos');
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  const productosPorCategoria = (categoriaId) => {
    return productos.filter(producto => producto.id === categoriaId);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Categorías con Productos</h3>
      {cargando && <p>Cargando...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row g-4">
        {categorias.map(cat => (
          <div key={cat.id} className="col-md-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{cat.nombrecat}</h5>
                <ul className="list-group list-group-flush">
                  {productosPorCategoria(cat.id).map(prod => (
                    <li key={prod.id} className="list-group-item">
                      {prod.nombre}
                    </li>
                  ))}
                </ul>
                <Link to={`/categorias/${cat.id}`} className="btn btn-primary mt-2">Ver categoría</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;


// ProductosPorCategoria.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './header'; 
import Footer from './footer';

const ProductosPorCategoria = () => {
  const {id} = useParams();
  const [productos, setProductos] = useState([]);
  const [categorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://mock.apidog.com/m1/920738-903315-default/market')
      .then(res => res.json())
      .then(data => {
        const productosFiltrados = data.filter(prod => prod.idcat === parseInt(id));
        setProductos(productosFiltrados);
      })
      .catch(err => console.error('Error:', err))
      .finally(() => setCargando(false));
  }, [id]);


  
  return (
        <>
      <Header />
    <div className="container mt-4">
      <h3>Productos de la categoría {productos.id}</h3>
        <p className="card-title">{categorias.nombrecat}</p>
      {cargando ? <p>Cargando...</p> : (
        <div className="row">
          {productos.map(prod => (
            <div key={prod.id} className="col-md-4 mb-3">
              <div className="card">
                <img src={prod.cover} className="card-img-top" alt={prod.idcat} />
                <div className="card-body">
                  <h5>{prod.idcat}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

      )}
    </div>
<p>hol</p>
              <Footer />
    </>
  );
};

export default ProductosPorCategoria;
import React, { useEffect, useState } from 'react';
const ProductosPorCategoria = () => {
  const [productosPorCategoria, setProductosPorCategoria] = useState({});
  useEffect(() => {
    fetch('https://mock.apidog.com/m1/920738-903315-default/market')
      .then(res => res.json())
      .then(data => {
        const agrupados = data.reduce((acc, producto) => {
          const idcat = producto.idcat;
          if (!acc[idcat]) acc[idcat] = [];
          acc[idcat].push(producto);
          return acc;
        }, {});
        setProductosPorCategoria(agrupados);
      })
      .catch(error => console.error('Error al cargar productos:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Productos por Categoría</h3>

      {Object.entries(productosPorCategoria).map(([idcat, productos]) => (
        <div key={idcat} className="mb-5">
          <h4>Categoría ID: {idcat}</h4>
          <div className="row">
            {productos.map(producto => (
              <div key={producto.id} className="col-md-3">
                <div className="card mb-4">
                  <img src={producto.cover} className="card-img-top" alt={producto.nombre} />
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductosPorCategoria;

es correcto
import React, { useEffect, useState } from 'react';

const CategoriasFiltradas = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Obtener todas las categorías
  useEffect(() => {
    fetch('https://mock.apidog.com/m1/920738-903315-default/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error('Error cargando categorías:', err));
  }, []);

  // Obtener todos los productos
  useEffect(() => {
    fetch('https://mock.apidog.com/m1/920738-903315-default/market')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error cargando productos:', err));
  }, []);

  // Filtrar productos por categoría cuando se selecciona una
  useEffect(() => {
    if (categoriaSeleccionada !== null) {
      const filtrados = productos.filter(p => p.idcat === categoriaSeleccionada);
      setProductosFiltrados(filtrados);
    }
  }, [categoriaSeleccionada, productos]);

  return (
    <div className="container mt-4">
      <h2>Selecciona una Categoría</h2>
      <div className="mb-4 d-flex flex-wrap gap-2">
        {categorias.map(cat => (
          <button
            key={cat.id}
            className="btn btn-outline-primary"
            onClick={() => setCategoriaSeleccionada(cat.id)}
          >
            {cat.nombrecat}
          </button>
        ))}
      </div>

      {categoriaSeleccionada && (
        <>
          <h3>Productos de la Categoría {categoriaSeleccionada}</h3>
          <div className="row">
            {productosFiltrados.map(prod => (
              <div key={prod.id} className="col-md-3">
                <div className="card mb-4">
                  <img src={prod.cover} className="card-img-top" alt={prod.nombre} />
                  <div className="card-body">
                    <h5 className="card-title">{prod.nombre}</h5>
                    <p className="card-text">{prod.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoriasFiltradas;/*}
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductosPorCategoria = () => {
  const { id } = useParams(); // id de la categoría desde la URL
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:3658/m1/920738-903315-default/market/categoriaproductos')
      .then(res => res.json())
      .then(data => {
        const filtrados = data.filter(prod => prod.idcat === parseInt(id)); // Filtra por idcat
        setProductos(filtrados);
      })
      .catch(err => {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos.');
      })
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h3>Productos de la categoría {id}</h3>
      <div className="row">
        {productos.map(prod => (
          <div key={prod.id} className="col-md-3">
            <div className="card h-100">
              <img src={prod.cover} className="card-img-top" alt={prod.nombre} />
              <div className="card-body">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text">{prod.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
        {productos.length === 0 && <p>No hay productos en esta categoría.</p>}
      </div>
    </div>
  );
};

export default ProductosPorCategoria;*/}{/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductosPorCategoria = () => {
  const { idcat } = useParams();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://mock.apidog.com/m1/920738-903315-default/market')
      .then(res => res.json())
      .then(data => {
        const filtrados = data.filter(prod => prod.idcat === parseInt(idcat));
        setProductos(filtrados);
      })
      .catch(err => console.error('Error cargando productos:', err))
      .finally(() => setCargando(false));
  }, [idcat]);

  if (cargando) return <p>Cargando productos...</p>;

  return (
    <div className="container mt-4">
      <h3>Productos de la categoría {idcat}</h3>
      <div className="row">
        {productos.map((prod, index) => (
          <div key={index} className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h5>{prod.producto}</h5>
              <p>Precio: ${prod.precio}</p>
              <p>Pasillo: {prod.pasillo}</p>
              <p>Percha: {prod.percha}</p>
              <p>Nivel: {prod.nivel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosPorCategoria;

*/}




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import style from './../Categorias/categorias.module.css';
import Header from './header'; 
import Footer from './footer';
import Popup from 'reactjs-popup';

const ProductosPorCategoria = () => {
const { idcat } = useParams();
const [productos, setProductos] = useState([]);
const [nombreCategoria, setNombreCategoria] = useState('');
const [cargando, setCargando] = useState(true);

useEffect(() => {
  fetch('https://mock.apidog.com/m1/920738-903315-default/market')
      .then(res => res.json())
      .then(data => {
        const filtrados = data.filter(prod => prod.idcat === parseInt(idcat));
        setProductos(filtrados);
      })
      .catch(err => console.error('Error cargando productos:', err));
  fetch(`https://mock.apidog.com/m1/920738-903315-default/categorias/${idcat}`)
      .then(res => res.json())
      .then(data => {
        setNombreCategoria(data.nombrecat); 
      })
      .catch(err => console.error('Error cargando categoría:', err))
      .finally(() => setCargando(false));
  }, [idcat]);
  if (cargando) return <p>Cargando productos...</p>;
  return (
  <>
    <Header/>
      <form className={style.buscador} method="get" action="/search">
        <input
          className={style.textoin}
          type="search"
          name="query"
          placeholder="Ingrese el nombre del producto"
        />
        <button className={style.btn}>Buscar</button>
        <button className={style.btn}><Link to="/map">Mapa</Link></button>
      </form>
    <div className="container mt-4">
      <h3 className={style.titcateg}>{nombreCategoria}</h3>
        <div className="row">
            {productos.map((prod, index) => (
        <div key={index} className="col-md-3">
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
              <div className="p-3">
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
                    <button className={style.btn}><Link to="/map">Mapa</Link></button>
                  </div>
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
export default ProductosPorCategoria;