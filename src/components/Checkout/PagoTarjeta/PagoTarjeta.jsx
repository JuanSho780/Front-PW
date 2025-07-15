import './PagoTarjeta.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PagoTarjeta = ({ volver }) => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const [nroTarjeta, setNroTarjeta] = useState('');
  const [tipoTarjeta, setTipoTarjeta] = useState('');

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('usuario'));
    if (u) {
      setUsuario(u);

      axios
        .get(`http://localhost:3001/Carrito/items/${u.id}`)
        .then((res) => setCarrito(res.data))
        .catch((err) => console.error('Error al cargar carrito:', err));
    }
  }, []);

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => {
      const precio = parseFloat(item.producto.precio);
      return acc + precio * item.cantidad;
    }, 0);
  };

  const finalizarCompra = async () => {
    if (!usuario || !carrito.length || !nroTarjeta) return;

    const total = calcularTotal();

    try {
      // 1. Crear orden
      const resOrden = await axios.post('http://localhost:3001/Orden/create/', {
        idUsuario: usuario.id,
        total,
        subtotal: total,
        metodoDeEntrega: 'delivery',
        nroTarjeta,
        tipoTarjeta,
      });

      const idOrden = resOrden.data.id;

      // 2. Agregar productos a la orden
      for (const item of carrito) {
        await axios.post('http://localhost:3001/Orden/add-item/', {
          idOrden,
          idProducto: item.producto.id,
          cantidad: item.cantidad,
        });
      }

      navigate('/end');
    } catch (error) {
      console.error('Error al finalizar compra:', error);
    }
  };

  return (
    <div className="form-card">
      <h4>Método de pago</h4>
      <img src="https://img.freepik.com/vector-premium/tarjetas-credito_648765-5212.jpg?w=2000" alt="Tarjeta" />
      <input
        placeholder="Número de tarjeta"
        value={nroTarjeta}
        onChange={(e) => setNroTarjeta(e.target.value)}
      />
      <input
        placeholder="Tipo de tarjeta (Visa, Mastercard...)"
        value={tipoTarjeta}
        onChange={(e) => setTipoTarjeta(e.target.value)}
      />
      <div className="form-row">
        <input placeholder="Fecha de expiración" />
        <input placeholder="CVC" />
      </div>
      <div className="btn-group">
        <button onClick={volver}>← Volver</button>
        <button onClick={finalizarCompra}>Pagar</button>
      </div>
    </div>
  );
};

export default PagoTarjeta;
