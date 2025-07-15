import React from 'react';
import './Comp.css'
const Listau = ({ avatar, name, date, status, statusColor }) => {
  return (
    <tr>
      <td>
        <img src={avatar} alt={name} width="50" /> {name}
      </td>
      <td>{date}</td>
      <td className={statusColor}>{status}</td>
      <td>
        <button>Desactivar</button>
        <button>Ver Detalle</button>
      </td>
    </tr>
  );
};

export default Listau;