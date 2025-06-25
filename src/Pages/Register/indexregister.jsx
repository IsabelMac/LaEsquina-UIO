import { useState } from 'react';
import style from './register.module.css';
import {Link} from "react-router-dom";
import Header from './../Categorias/header'; 
import Footer from './../Categorias/footer';
function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        userid:'',
        password: ''
    });
    const handleChange = (e) => {
    const {name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://mock.apidog.com/m1/920738-903315-default/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Error al enviar datos');
            }
            const data = await response.json();
            console.log('Respuesta de la API:', data);
            alert('Registro exitoso');
            setFormData({
                nombre: '',
                email: '',
                password: '',
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al registrar');
        }
    };
    return (
    <>
   <Header/> 
        <div className={style.forms}>
            <div>
            <img src="src/assets/laesquinalogo.svg" alt="logo La Esquina"/><div/>
            <div className={style.container}>
                <p> ¡Crea tu cuenta!</p>
                <div className={style.row}></div>
                <div>
                    <form className={style.form} onSubmit={handleSubmit}>
                        <div>
                            <label>Nombre:</label>
                            <input className={style.textoin}
                                type="text"
                                name="nombre"
                                required
                                value={formData.nombre}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <label>Correo:</label>
                            <input className={style.textoin}
                                   type="email"
                                   name="email"
                                   required
                                   value={formData.email}
                                   onChange={handleChange} />
                        </div>
                        <div>
                            <label>Contraseña:</label>
                            <input className={style.textoin}
                                   type="password"
                                   name="password"
                                   required
                                   value={formData.password}
                                   onChange={handleChange} />
                        </div>
                        <button className={style.btn} type="submit">Registrarme</button>
                    </form>
                </div>
            </div>
                <span>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></span>
            </div>
        </div>
    <Footer />
    </>
    );
}
export default Register;