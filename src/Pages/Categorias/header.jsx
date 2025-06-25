import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/laesquinalogoblanc.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './../Categorias/header.module.css';

function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleAccederClick = () => {
    navigate('/login'); 
  };

  return (
    <header>
      <div className={style.container}>
        <div className="row align-items-center">
          <div className="col">
            <img className={style.logob}
              src={logo} 
              alt="Logo" 
              style={{ cursor: 'pointer' }} 
              onClick={handleLogoClick}
            />
          </div>
          <div className="col text-center">
            <button 
              className="btn btn-outline-light"
              onClick={handleAccederClick}
            >
              Acceder
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;