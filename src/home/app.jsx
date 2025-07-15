import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer/Footer.jsx";
import './app.css';

function App() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Cargar categorías
    fetch('http://localhost:3001/categoria')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error('Error cargando categorías:', err));

    // Cargar productos
    fetch('http://localhost:3001/producto')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error cargando productos:', err));
  }, []);

  const irAResultados = () => {
    navigate('/resultados');
  };

  const agregarAlCarrito = async (idProducto) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
      setMensaje('Debes iniciar sesión para agregar productos al carrito');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    const body = {
      idUsuario: usuario.id, // Asegúrate que el campo correcto sea `id`, si es `idUsuario`, cámbialo
      idProducto: idProducto,
      cantidad: 1
    };

    try {
      const res = await fetch('http://localhost:3001/Carrito/add-item/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMensaje('Producto agregado al carrito');
      } else {
        setMensaje('Error al agregar producto');
      }
    } catch (err) {
      console.error(err);
      setMensaje('Error de conexión');
    }

    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div className="landing-container">

      {/* Mensaje de feedback */}
      {mensaje && <div className="mensaje-popup">{mensaje}</div>}

      {/* Banner */}
      <section className="banner">
        <img src="/img/banner.png" alt="Publicidad" />
      </section>

      {/* Categorías */}
      <section className="categorias">
        <h2>Explora las categorías</h2>
        <div className="categoria-items">
          {categorias.map((cat) => (
            <div key={cat.id} className="categoria">
              <div className="circle">
                <img src={`/img/${cat.nombre.toLowerCase().split(" ")[0]}.png`} alt={cat.nombre} />
              </div>
              <p>{cat.nombre}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Más vendidos */}
      <section className="mas-vendidos">
        <h2>Lo más vendido</h2>

        <div className="scroll-horizontal">
          {productos.map((prod) => (
            <div key={prod.id} className="producto">
              <img src={prod.imagen} alt={prod.nombre} />
              <h4>{prod.nombre}</h4>
              <p className="categoria">{prod.categoria?.nombre || 'Sin categoría'}</p>
              <p className="precio">S/{parseFloat(prod.precio).toFixed(2)}</p>
              <button className="agregar-btn" onClick={() => agregarAlCarrito(prod.id)}>
                AGREGAR
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
