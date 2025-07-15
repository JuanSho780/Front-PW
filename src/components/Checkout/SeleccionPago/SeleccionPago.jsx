import './SeleccionPago.css';

const SeleccionPago = ({ avanzar }) => {
  return (
    <div className="form-card">
      <h4>Método de pago</h4>
      <div className="seleccion-metodo">
        <div className="opcion" onClick={() => avanzar('qr')}>
          <p>Generar QR</p>
          <img src="https://th.bing.com/th/id/OIP.U1S5NpMGxCdvgw4EJcMuegHaHa?rs=1&pid=ImgDetMain" alt="QR" />
        </div>
        <div className="opcion" onClick={() => avanzar('tarjeta')}>
          <img src="https://th.bing.com/th/id/R.7aee51301cfd0a12140877915c2cfa77?rik=2j85tcH6i4SSog&pid=ImgRaw&r=0" alt="Tarjetas" />
        </div>
      </div>
    </div>
  );
};

export default SeleccionPago;
