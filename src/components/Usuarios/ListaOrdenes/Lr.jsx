const Lr = ({ id, name, date, total, status }) => {
  let statusColor = '';

  if (status === 'Entregado') {
    statusColor = 'text-green-600 font-semibold';
  } else if (status === 'Por entregar') {
    statusColor = 'text-red-600 font-bold';
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{date}</td>
      <td>S/{total}</td>
      <td className={statusColor}>{status}</td>
      <td>
        <button className="bg-red-500 text-white px-3 py-1 rounded">
          Ver detalle
        </button>
      </td>
    </tr>
  );
};

export default Lr;
