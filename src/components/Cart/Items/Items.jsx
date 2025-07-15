import './Items.css'
import { useCart } from '../../../context/CartContext';

const Item = ({ id, nombre, descripcion, cantidad, precio, imagen }) => {
  const { actualizarCantidad, eliminarProducto } = useCart();

  const aumentar = () => actualizarCantidad(id, cantidad + 1);
  const disminuir = () => {
    if (cantidad > 1) {
      actualizarCantidad(id, cantidad - 1);
    }
  };

  const subtotal = cantidad * precio;

  return (
    <div className="item-carrito">
      <img src={imagen} alt={nombre} className="item-img" />

      <div className="item-info">
      <p className="item-nombre">{nombre}</p>
      <p className="item-descripcion">{descripcion}</p>
    </div>

    <div className="item-controles">
      <p className="item-precio">S/ {subtotal.toFixed(2)}</p>

      <div className="item-botones">
        <div className="item-cantidad">
          <button className="btn-cantidad" onClick={disminuir}>−</button>
          <span>{cantidad}</span>
          <button className="btn-cantidad" onClick={aumentar}>+</button>
        </div>

      <button className="btn-eliminar" onClick={() => eliminarProducto(id)}>🗑️</button>
    </div>
  </div>
</div>

  );
};

export default Item;
