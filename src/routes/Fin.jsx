import FinPage from '../components/Fin/Fin'
import { useCart } from '../context/CartContext'
import { Navigate } from 'react-router-dom'

const Fin = () => {
  const { carrito, direccion } = useCart();

  if (carrito.length > 0 || direccion) {
    return <FinPage />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Fin;