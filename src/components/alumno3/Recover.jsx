import React, { useState } from 'react';
import './Login.css'; 
// import Header from '../Header/header'; 
import Footer from '../Footer/Footer'; 

const Recover = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Por favor ingresa tu correo electrónico.');
      return;
    }

    // Simulación de envío
    setMensaje('📩 Se envió un enlace a tu correo electrónico.');
    setError('');
    setEmail('');
  };

  return (
    <>
      <div className="login-wrapper">
        <form className="recover-card" onSubmit={handleSubmit}>
          <h2>Olvidé mi contraseña</h2>

          <p className="recover-text">
            Se enviará un enlace a tu correo electrónico para que puedas validar tu nueva contraseña.
            <br />
            Por favor, asegúrate de revisar tu bandeja de entrada y la carpeta de spam.
          </p>

          <input
            type="email"
            placeholder="usuario@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="error">{error}</p>}
          {mensaje && <p className="success">{mensaje}</p>}

          <button type="submit">Recuperar contraseña</button>
        </form>
      </div>
      <Footer /> 
    </>
  );
};

export default Recover;
