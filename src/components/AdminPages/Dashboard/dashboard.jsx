
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/Header/header.jsx";
import './adminStyle.css';
import Pagination from '../../Categorias/Paginacion/Pag.jsx';
import TablaCategorias from '../../Categorias/CateTabla/TablaCategorias.jsx';
import axios from 'axios';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [totalIngresos, setTotalIngresos] = useState(0);

  const [usersPage, setUsersPage] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);

  const usersPerPage = 7;
  const ordersPerPage = 4;

  const totalUsersPages = Math.ceil(users.length / usersPerPage);
  const totalOrdersPages = Math.ceil(orders.length / ordersPerPage);

  const currentUsers = users.slice((usersPage - 1) * usersPerPage, usersPage * usersPerPage);
  const currentOrders = orders.slice((ordersPage - 1) * ordersPerPage, ordersPage * ordersPerPage);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsers = await axios.get("http://localhost:3001/Usuario");
        const resOrders = await axios.get("http://localhost:3001/orden/");

        const nonAdminUsers = resUsers.data.filter(user => !user.isAdmin);
        setUsers(nonAdminUsers);
        setOrders(resOrders.data);

        const ingresos = resOrders.data.reduce((acc, orden) => acc + orden.total, 0);
        setTotalIngresos(ingresos);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    fetchData();
  }, []);

    const handleUserSelect = async (user) => {
      setSelectedUser(user);
      try {
        const res = await axios.get(`http://localhost:3001/Orden/items/${user.id}`);
        setUserOrders(res.data);
      } catch (error) {
        console.error("Error al obtener órdenes del usuario:", error);
      }
    };

    const toggleUserActiveStatus = async (user) => {
    try {
      const updatedUser = {
        id: user.id,
        isActive: !user.isActive, // Cambia el estado actual
      };

      await axios.put("http://localhost:3001/Usuario/", updatedUser);

      // Actualiza la lista de usuarios localmente
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === user.id ? { ...u, isActive: updatedUser.isActive } : u
        )
      );

      // Si es el usuario seleccionado, actualiza también su estado
      if (selectedUser && selectedUser.id === user.id) {
        setSelectedUser(prev => ({ ...prev, isActive: updatedUser.isActive }));
      }
    } catch (error) {
      console.error("Error al actualizar el estado del usuario", error);
    }
  };


  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="metrics-grid">
        <div className="metric-card"><span className="metric-label">Órdenes</span><span className="metric-value">{orders.length}</span></div>
        <div className="metric-card"><span className="metric-label">Usuarios nuevos</span><span className="metric-value">{users.length}</span></div>
        <div className="metric-card"><span className="metric-label">Ingresos totales</span><span className="metric-value">S/ {totalIngresos.toFixed(2)}</span></div>
      </div>

      <div className="main-content">
        <div className="users-section">
          <div className="section-header"><h2>Usuarios registrados</h2></div>
          <div className="table-container">
            <TablaCategorias
              class="users-table"
              headers={["Nombre", "Estado", "Acciones"]}
              data={currentUsers}
              renderRow={(item) => (
                <>
                  <td>
                    <div className="user-info">
                      <img src={"https://i.pravatar.cc/40?u=" + item.id} alt={item.nombre} className="user-avatar" />
                      <span>{item.nombre} {item.apellido}</span>
                    </div>
                  </td>
                  <td><span className={`status ${item.isActive ? "activo" : "inactivo"}`}>{item.isActive ? "Activo" : "Inactivo"}</span></td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn-deactivate"
                        onClick={() => toggleUserActiveStatus(item)}
                      >
                        {item.isActive ? "Desactivar" : "Activar"}
                      </button>
                      <button className="btn-details" onClick={() => handleUserSelect(item)}>Ver detalles</button>
                    </div>
                  </td>
                </>
              )}
            />
            <Pagination currentPage={usersPage} totalPages={totalUsersPages} onPageChange={setUsersPage} />
          </div>
        </div>

        <div className="user-details">
          {selectedUser ? (
            <div className="user-profile">
              <div className="profile-header">
                <div className="profile-info">
                  <h3>{selectedUser.nombre} {selectedUser.apellido}</h3>
                  <p>Correo: {selectedUser.nombredeusuario}@email.com</p>
                  <p>Fecha de registro: {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                  <p>Estado: {selectedUser.isActive ? "Activo" : "Inactivo"}</p>
                </div>
                <img src={"https://i.pravatar.cc/80?u=" + selectedUser.id} alt={selectedUser.nombre} className="profile-avatar" />
              </div>
              <div className="transactions-table">
                <TablaCategorias
                  class="transactions-table-principal"
                  headers={["#ID", "Fecha", "Total"]}
                  data={userOrders}
                  renderRow={(item) => (
                    <>
                      <td className='transaction-id'>#{item.id}</td>
                      <td>{new Date(item.fecha).toLocaleDateString()}</td>
                      <td>S/ {item.total.toFixed(2)}</td>
                    </>
                  )}
                />
              </div>
            </div>
          ) : (
            <div className="no-user-selected"><p>Selecciona un usuario para ver sus detalles</p></div>
          )}
        </div>
      </div>

      <div className="orders-section">
        <div className="section-header">
          <h2>Listado de órdenes</h2>
          <div className="orders-actions">
            <button onClick={() => navigate('/listaProductos')} className="btn-products">Ver productos</button>
            <button className="btn-view-orders">Ver todas las órdenes</button>
          </div>
        </div>
        <div className="table-container">
          <TablaCategorias
            class="orders-table"
            headers={["#ID", "Usuario", "Fecha de orden", "Total", "Estado"]}
            data={currentOrders}
            renderRow={(item) => (
              <>
                <td className='transaction-id'>#{item.id}</td>
                <td>{users.find(u => u.id === item.idUsuario)?.nombre || "Desconocido"}</td>
                <td>{new Date(item.fecha).toLocaleDateString()}</td>
                <td>S/ {item.total.toFixed(2)}</td>
                <td><span className="status entregado">Entregado</span></td>
              </>
            )}
          />
          <Pagination currentPage={ordersPage} totalPages={totalOrdersPages} onPageChange={setOrdersPage} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
