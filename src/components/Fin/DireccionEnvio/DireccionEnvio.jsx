import { useCart } from '../../../context/CartContext';

const DireccionEnvio = () => {
  const { direccion } = useCart();

  if (!direccion) return null;

  return (
    <div className="direccion-container">
      <h4>Dirección de envío</h4>
      <p>{direccion.nombre} {direccion.apellido}</p>
      <p>{direccion.direccion}</p>
      <p>{direccion.ciudad}, {direccion.departamento}</p>
      <p>Código postal: {direccion.postal}</p>
      <p>Teléfono: {direccion.telefono}</p>
    </div>
  );
};

export default DireccionEnvio;
