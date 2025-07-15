import ListaProductos from './ListaProductos/ListaProductos';
import ResumenFinal from '../Cart/ResumenCompra/ResumenCompra';
import DireccionEnvio from './DireccionEnvio/DireccionEnvio';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Fin.css";

const Fin = () => {
  const navigate = useNavigate();

  const volverInicio = async () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    try {
      await axios.delete('http://localhost:3001/Carrito/delete-all/', {
        data: {
           idUsuario: usuario.id,
        },
      });
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
    }
    
    navigate('/');
  };

  return (
    <div className="fin-container">
      <h2>Orden completada :)</h2>
      <p>Gracias por tu compra</p>

      <div className="fin-flex">
        <ListaProductos />
        <div className="fin-derecha">
          <ResumenFinal />
          <DireccionEnvio />
        </div>
      </div>

      <div>
        <button onClick={volverInicio}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default Fin;
