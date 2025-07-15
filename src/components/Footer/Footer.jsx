import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Síguenos</h4>
        <div className="social-icons">
          <img src="/img/facebook.svg" alt="Facebook" />
          <img src="/img/x.svg" alt="X" />
          <img src="/img/instagram.svg" alt="Instagram" />
          <img src="/img/youtube.svg" alt="YouTube" />
        </div>
      </div>
      <div className="footer-section">
        <h4>Nosotros</h4>
        <p>Condiciones</p>
        <p>Responsabilidad social</p>
        <p>Nuestras tiendas</p>
      </div>
      <div className="footer-section">
        <h4>Atención al cliente</h4>
        <p>Atención al cliente</p>
        <p>Horario de atención</p>
        <p>Preguntas frecuentes</p>
      </div>
      <div className="footer-section">
        <h4>Políticas y condiciones</h4>
        <p>Políticas de datos personales</p>
        <p>Condición de promociones</p>
        <p>Términos y condiciones</p>
      </div>
    </footer>
  );
};

export default Footer;
