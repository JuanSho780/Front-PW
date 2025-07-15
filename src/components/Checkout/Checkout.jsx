import { useState } from 'react';
import './Checkout.css';
import FormularioEnvio from './FormularioEnvio/FormularioEnvio';
import SeleccionPago from './SeleccionPago/SeleccionPago';
import PagoQR from './PagoQR/PagoQR';
import PagoTarjeta from './PagoTarjeta/PagoTarjeta';
import ResumenCompra from "../Cart/ResumenCompra/ResumenCompra";

const Checkout = () => {
  const [etapa, setEtapa] = useState('envio');

  const avanzar = (siguiente) => setEtapa(siguiente);

  const renderContenido = () => {
    switch (etapa) {
      case 'envio': return <FormularioEnvio avanzar={avanzar} />;
      case 'seleccion': return <SeleccionPago avanzar={avanzar} />;
      case 'qr':
        return <PagoQR volver={() => setEtapa('seleccion')} />;
      case 'tarjeta':
        return <PagoTarjeta volver={() => setEtapa('seleccion')} />;


      default: return null;
    }
  };

  return (
    <div className="checkout-wrapper">
    <div className="checkout-container">
    <div className="checkout-formulario">
      <h2>Checkout</h2>
      {renderContenido()}
    </div>
  </div>

  <div className="checkout-resumen">
    <ResumenCompra />
  </div>
</div>

  );
};

export default Checkout;
