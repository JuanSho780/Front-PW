import React from 'react';
const UserDetail = ({ user }) => {
  return (
    <div className="box">
      <div className="user-detail">
        <div>
          <p><strong>{user.nombre}</strong></p>
          <p>Correo: {user.email}</p>
          <p>Fecha de registro: {user.fechaRegistro}</p>
          <p>Estado: {user.estado}</p>
        </div>
        <img src={user.img} alt="" className="avatar-large" />
      </div>
      <table>
        <thead>
          <tr><th>#ID</th><th>Fecha</th><th>Total</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {user.usuarios.map((orden, index) => (
            <tr key={index}>
              <td className="red">#{orden.id}</td>
              <td>{orden.fecha}</td>
              <td>S/{orden.total}</td>
              <td>
                <button>Ver Detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetail;
