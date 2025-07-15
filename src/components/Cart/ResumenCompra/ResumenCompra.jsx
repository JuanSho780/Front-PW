import { useEffect, useState } from 'react';
import "./ResumenCompra.css";

const ResumenCompra = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) return;

    fetch(`http://localhost:3001/Carrito/items/${usuario.id}`)
      .then(res => res.json())
      .then(data => setCarrito(data))
      .catch(err => console.error("Error al cargar el carrito:", err));
  }, []);

  const obtenerTotal = () => {
    return carrito.reduce((total, item) => {
      const precio = parseFloat(item.producto.precio);
      return total + precio * item.cantidad;
    }, 0);
  };

  return (
    <div className="resumen-compra">
      <h3>Resumen de la compra</h3>

      <div className="resumen-linea">
        <span>Productos</span>
        <span>S/ {obtenerTotal().toFixed(2)}</span>
      </div>

      <div className="resumen-linea">
        <span>Delivery</span>
        <span className="verde">GRATIS</span>
      </div>

      <div className="resumen-linea">
        <span>Descuentos</span>
        <span className="rojo">- S/ 0.00</span>
      </div>

      <hr />

      <div className="resumen-total">
        <strong>Total</strong>
        <strong>S/ {obtenerTotal().toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default ResumenCompra;
