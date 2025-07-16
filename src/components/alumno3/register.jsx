import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombredeusuario: '',
    password: '',
    nombre: '',
    apellido: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    isAdmin: false,
    isActive: true,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.nombredeusuario || !formData.password) {
      setError('Correo y contraseña son obligatorios.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/Usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newUser = await response.json(); // Aquí se obtiene el nuevo usuario creado
        const idUsuario = newUser.id;

        // Crear carrito para el nuevo usuario
        const carritoResponse = await fetch('http://localhost:3001/Carrito/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idUsuario })
        });

        if (carritoResponse.ok) {
          alert('Usuario registrado con éxito y carrito creado');
          navigate('/login');
        } else {
          setError('Usuario registrado, pero hubo un problema al crear el carrito');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al registrar usuario');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Registrarme</h2>

        <input type="text" name="nombredeusuario" placeholder="Correo electrónico"
               value={formData.nombredeusuario} onChange={handleChange} />

        <input type="password" name="password" placeholder="Contraseña"
               value={formData.password} onChange={handleChange} />

        <input type="text" name="nombre" placeholder="Nombre"
               value={formData.nombre} onChange={handleChange} />

        <input type="text" name="apellido" placeholder="Apellido"
               value={formData.apellido} onChange={handleChange} />

        <input type="text" name="direccion" placeholder="Dirección"
               value={formData.direccion} onChange={handleChange} />

        <input type="text" name="ciudad" placeholder="Ciudad"
               value={formData.ciudad} onChange={handleChange} />

        <input type="text" name="telefono" placeholder="Teléfono"
               value={formData.telefono} onChange={handleChange} />

        <label>
          ¿Administrador?
          <input type="checkbox" name="isAdmin"
                 checked={formData.isAdmin} onChange={handleChange} />
        </label>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Crear cuenta</button>

        <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </form>
    </div>
  );
};

export default Register;
