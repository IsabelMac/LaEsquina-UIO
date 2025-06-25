import { useState } from 'react';
import style from './login.module.css';
import { Link } from 'react-router-dom';
import Header from './../Categorias/header'; 
import Footer from './../Categorias/footer';


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('https://mock.apidog.com/m1/920738-903315-default/user');
    if (!res.ok) throw new Error('Error al leer usuarios');
    const users = await res.json();
    const usuario = users.find(u =>
      u.email === formData.email && u.password === formData.password
    );
    if (usuario) {
      localStorage.setItem('user', JSON.stringify(usuario));
      alert('¡Bienvenido, ' + usuario.email + '!');
      window.location.href = '/crearproducto'; // o redirigir con useNavigate()
    } else {
      alert('Email o contraseña incorrectos');
    }
  } catch (error) {
    console.error(error);
    alert('Hubo un error validando tus credenciales');
  }
};
    return (
        <>
        <Header/> 
        <div className={style.forms}>
            <div>
                <img src="src/assets/laesquinalogo.svg" alt="logo La Esquina"/>
                <div className={style.container}>
                    <p> ¡Bienvenido!</p>
                    <form className={style.form} onSubmit={handleSubmit}>
                        <div>
                            <label>Correo:</label>
                            <input
                                className={style.textoin}
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Contraseña:</label>
                            <input
                                className={style.textoin}
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button className={style.btn} type="submit">Ingresar</button>
                    </form>
                    <span>¿No tienes cuenta? <Link to="/register">Regístrate</Link></span>
                </div>
            </div>
        </div>
        <Footer/> 
        </>
    );
}
export default Login;