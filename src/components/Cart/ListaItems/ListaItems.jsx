import "./ListaItems.css";
import { useEffect, useState } from "react";

const ListaItems = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) return;

    fetch(`http://localhost:3001/Carrito/items/${usuario.id}`)
      .then(res => res.json())
      .then(data => setCarrito(data))
      .catch(err => console.error("Error al cargar el carrito:", err));
  }, []);

  if (carrito.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <div className="lista-items">
      {carrito.map((item) => (
        <div key={item.id} className="item-carrito">
          <img src={item.producto.imagen} alt={item.producto.nombre} className="imagen-producto" />
          <div className="info-producto">
            <h4>{item.producto.nombre}</h4>
            <p>{item.producto.marca}</p>
            <p>Cantidad: {item.cantidad}</p>
            <p>Precio unitario: S/ {parseFloat(item.producto.precio).toFixed(2)}</p>
            <p>Subtotal: S/ {(item.cantidad * parseFloat(item.producto.precio)).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaItems;
