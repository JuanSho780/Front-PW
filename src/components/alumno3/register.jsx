import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Importación necesaria
import './Login.css';
// import Header from '../Header/header';
import Footer from '../Footer/Footer';

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // ✅ Inicializa navegación

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, apellido, dni, email, password, confirmPassword } = form;

    if (!nombre || !apellido || !dni || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    alert('Usuario registrado correctamente');
    setError('');
    navigate('/'); // ✅ Redirige a App.jsx (Home)
  };

  return (
    <>
      <div className="login-wrapper">
        <form className="register-card" onSubmit={handleSubmit}>
          <h2>Registro</h2>

          <div className="form-grid">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del usuario"
              value={form.nombre}
              onChange={handleChange}
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido del usuario"
              value={form.apellido}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              value={form.dni}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Registrarme</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
