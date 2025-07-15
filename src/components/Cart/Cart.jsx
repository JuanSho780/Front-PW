import ListaItems from './ListaItems/ListaItems';
import ResumenCompra from './ResumenCompra/ResumenCompra';
import { useNavigate } from 'react-router-dom';
import "./Cart.css"
const Cart = () => {
  const navigate = useNavigate();
  return (
    <div className="cart-container">
      <ListaItems />
      <div className="cart-resumen-bloque">
        <ResumenCompra />
        <button className="btn-comprar" onClick={() => navigate('/form')}>
          Continuar compra
        </button>
      </div>
    </div>
  );
};

export default Cart;