import './ListaProductos.css';
import { useEffect, useState } from 'react';

const ListaProductos = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) return;

    fetch(`http://localhost:3001/Carrito/items/${usuario.id}`)
      .then(res => res.json())
      .then(data => setCarrito(data))
      .catch(err => console.error("Error al cargar carrito:", err));
  }, []);

  if (carrito.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <div className="lista-pedido">
      <h3 className="titulo-resumen">Resumen de compra</h3>
      {carrito.map((item) => (
        <div className="item-pedido" key={item.producto.id}>
          <input type="checkbox" checked readOnly className="checkbox" />
          <img src={item.producto.imagen} alt={item.producto.nombre} className="imagen" />
          <div className="info">
            <p className="nombre">{item.producto.nombre}</p>
            <p className="descripcion">{item.producto.descripcion}</p>
            <p className="llega">Llega mañana</p>
          </div>
          <div className="cantidad">Cantidad: {item.cantidad}</div>
          <div className="precio">S/ {(item.producto.precio * item.cantidad).toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};

export default ListaProductos;
