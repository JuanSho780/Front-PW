import { useParams, useNavigate } from 'react-router-dom';
import Productos from "../data/Productos";
import './ProductoDetalle.css';
import Footer from "../components/Footer/Footer.jsx";
import { useCart } from '../context/CartContext';
import { filtrarProductos } from '../home/js/busqueda';

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCart();

  const producto = Productos.find(p => p.id === parseInt(id));

  if (!producto) return <p>Producto no encontrado.</p>;

  const similares = filtrarProductos(Productos, '', producto.categoria, '')
    .filter(p => p.id !== producto.id);

  return (
  <div className="landing-container">
  <div className="producto-detalle-container">
    <div className="producto-detalle-card">
      <div className="producto-img">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <div className="producto-info">
        <h2>{producto.nombre}</h2>
        <br />
        <p className="descripcion">{producto.descripcion}</p>
        <p className="precio">s/ {producto.precio} x kg</p>
        <button className="btn-agregar" onClick={() => agregarAlCarrito(producto)}>
          Agregar
        </button>
      </div>
    </div>

    <div className="similares">
      <h3>Productos similares</h3>
      <div className="similares-grid">
        {similares.map(similar => (
          <div key={similar.id} className="producto-similar">
            <img
              src={similar.imagen}
              className="producto-img"
              onClick={() => navigate(`/producto/${similar.id}`)}
            />
            <h4>{similar.nombre}</h4>
            <p>{similar.categoria}</p>
            <p>s/ {similar.precio}</p>
            <button onClick={() => agregarAlCarrito(similar)}>
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>


  </div>

     <Footer />
</div>

    
  );
}

export default ProductoDetalle;
