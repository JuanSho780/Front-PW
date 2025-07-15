import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
  const PagoQR = ({ volver }) => {
  const { vaciarCarrito } = useCart();
  const navigate = useNavigate();

  const finalizarCompra = () => {
    navigate('/end');
  };

  return (
    <div className="form-card">
      <h4>Escanear QR</h4>
      <img src="https://th.bing.com/th/id/OIP.U1S5NpMGxCdvgw4EJcMuegHaHa?rs=1&pid=ImgDetMain" alt="QR de pago" />
      <p>Válido por 05:00 minutos</p>
      <div className="btn-group">
        <button onClick={volver}>← Volver</button>
        <button onClick={finalizarCompra}>Ya realicé el pago</button>
      </div>
    </div>
  );
};

export default PagoQR;