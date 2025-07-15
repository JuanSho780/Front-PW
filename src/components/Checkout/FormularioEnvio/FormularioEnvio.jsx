import { useCart } from '../../../context/CartContext';
import { useState } from 'react';
import './FormularioEnvio.css';

const FormularioEnvio = ({ avanzar }) => {
  const { setDireccion } = useCart();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    ciudad: '',
    departamento: '',
    direccion: '',
    postal: '',
    telefono: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    return Object.values(form).every((valor) => valor.trim() !== '');
  };

  const continuar = () => {
    if (!validarFormulario()) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    setDireccion(form);
    avanzar('seleccion');
  };

  return (
    <div className="form-card">
      <h4>Dirección de envío</h4>
      <div className="form-grid">
        <div className="form-group">
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input name="apellido" value={form.apellido} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Ciudad</label>
          <input name="ciudad" value={form.ciudad} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Departamento</label>
          <input name="departamento" value={form.departamento} onChange={handleChange} />
        </div>
        <div className="form-group" style={{ gridColumn: "span 2" }}>
          <label>Dirección</label>
          <input name="direccion" value={form.direccion} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Código postal</label>
          <input name="postal" value={form.postal} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Teléfono de contacto</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} />
        </div>
      </div>
      <button onClick={continuar}>Seleccionar método de pago</button>
    </div>
  );
};

export default FormularioEnvio;
