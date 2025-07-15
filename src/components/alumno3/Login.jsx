import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import Footer from '../Footer/Footer';

const Login = () => {
  const [nombredeusuario, setNombreDeUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usuario, setUsuario] = useState(null);

  const navigate = useNavigate();

  // Si hay sesión guardada, cargarla
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsuario(parsedUser);
    }
  }, []);

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  // Iniciar sesión
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombredeusuario || !password) {
      setError('Completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombredeusuario, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('usuario', JSON.stringify(userData));
        setUsuario(userData);

        alert('Inicio de sesión exitoso');
        if (userData.isAdmin) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      console.error('Error en el login:', err);
      setError('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <>
      <div className="login-wrapper">
        {usuario ? (
          <div className="login-card">
            <h2>Hola, {usuario.nombre}</h2>
            <p>Ya has iniciado sesión.</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        ) : (
          <form className="login-card" onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={nombredeusuario}
              onChange={(e) => setNombreDeUsuario(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Iniciar sesión</button>

            <div className="login-links">
              <Link to="/register">Registrarme</Link>
              <Link to="/recover">¿Olvidé mi contraseña?</Link>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Login;
