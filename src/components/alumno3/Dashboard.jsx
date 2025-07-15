import React from 'react';
import './Login.css';

const orders = [
  { id: 1, producto: 'Celular Xiaomi', total: 'S/ 299.00', estado: 'Entregado' },
  { id: 2, producto: 'TV 50" UHD', total: 'S/ 899.00', estado: 'Pendiente' },
  { id: 3, producto: 'Desinfectante Clorox', total: 'S/ 10.00', estado: 'En camino' },
];

const Dashboard = () => {
  return (
    <div className="login-container">
      <h2>Bienvenido, Usuario</h2>

      <nav className="login-links">
        <a href="/catalogo">Catálogo</a>
        <a href="/login">Cerrar sesión</a>
      </nav>

      <h3 style={{ marginTop: '20px' }}>Tus Órdenes</h3>
      <table style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.producto}</td>
              <td>{order.total}</td>
              <td>{order.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
