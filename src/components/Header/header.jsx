import { useEffect, useState } from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';

const HeaderPre = () => {
  const [busqueda, setBusqueda] = useState('');

  const navigate = useNavigate();
  const irCarrito = () => {
  navigate('/cart');  
  };

  const irLogin = () => {
    navigate('/login');
  };

    const irAResultados = () => {
    navigate('/resultados');
  };
  
  const irAInicio = () => {
  navigate('/');
};



  return (
    <>
            <header className="top-header">
      <div
      className="logo"
      onClick={irAInicio} 
    >
      Mi-Tiendita<span className="dot">•</span>
    </div>
        
      {/* busqueda */}
       <input
      type="text"
      className="search"
      placeholder="Busqueda por nombre de producto, serie o marca"
      onClick={irAResultados}
    />


        <div className="acciones">
          <button onClick={irCarrito} className="btn-secundario">🛒 Carrito</button>
          <button onClick={irLogin} className="btn-secundario">👤 Usuario</button>

        </div>
      </header>
    </>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const irDashboard = () => {
    navigate('/dashboard');
  }
  
  return (
    <div className="landing-container">
      <HeaderPre />
      <nav className="menu">
        <ul>
          <li onClick={() => navigate('/Categorias')}>Categorías</li>
          <li>Productos</li>
          <li onClick={irDashboard}>Dashboard</li>
          <li className="ofertas">⭐ OFERTAS</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;