import productos from '../../data/Productos';
import { useCart } from '../../context/CartContext';
import './Catalogo.css';
import { useNavigate } from 'react-router-dom';

const Catalogo = () => {
  const { agregarAlCarrito } = useCart();
  const navigate = useNavigate();

  return (
    <div className="catalogo-container">
      {productos.map((producto) => (
        <div key={producto.id} className="producto-card">
          <img src={producto.imagen} alt={producto.nombre} />
          <h4>{producto.nombre}</h4>
          <p>{producto.descripcion}</p>
          <strong>S/ {producto.precio.toFixed(2)}</strong>
          <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
        </div>
      ))}
      <button className="btn-ir-carrito" onClick={() => navigate('/cart')}>
            Ir al carrito 🛒
        </button>
    </div>
    
  );
};
export default Catalogo;