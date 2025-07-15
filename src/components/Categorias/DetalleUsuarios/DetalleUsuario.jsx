import { useState } from "react"
import "./DeUsuario.css"
import Pagination from "../Paginacion/Pag.jsx"
import TablaCategorias from "../CateTabla/TablaCategorias.jsx"
import CambiarPass from "../CambioContraseña/CambiarPass.jsx"
import filterItems from "../../AdminPages/ListaProductos/filterProductos.jsx"
function DetalleUsuario() {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7
  const [mostrarCambio, setMostrarCambio] = useState(false)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)

  const allOrders = [
    { id: "#1000", user: "Juan Perez", date: "20/01/2025", total: "S/199.00", status: "Entregado" },
    { id: "#1001", user: "María Gonzales", date: "20/01/2025", total: "S/199.00", status: "Por entregar" },
    { id: "#1002", user: "Marco Aurelio", date: "20/01/2025", total: "S/199.00", status: "Entregado" },
    { id: "#1003", user: "Ana Días", date: "20/01/2025", total: "S/199.00", status: "Entregado" },
    { id: "#1004", user: "Juan Perez", date: "20/01/2025", total: "S/199.00", status: "Entregado" },
    { id: "#1005", user: "María Gonzales", date: "20/01/2025", total: "S/199.00", status: "Por entregar" },
    { id: "#1006", user: "Marco Aurelio", date: "20/01/2025", total: "S/199.00", status: "Entregado" },
    { id: "#1007", user: "Ana Días", date: "20/01/2025", total: "S/199.00", status: "Entregado" },
    { id: "#1008", user: "Juan Perez", date: "20/01/2025", total: "S/199.00", status: "Entregado" },
    { id: "#1009", user: "María Gonzales", date: "30/01/2025", total: "S/199.00", status: "Por entregar" },
  ]

  const filteredOrders = filterItems(
  allOrders,
  search,
  ["id", "date", "user", "total", "status"],
)

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  return (
    <div className="user-container">
      <h2>Hola Juan !</h2>

      <div className="user-info-grid">
        <div className="box">
          <h3>Datos personales</h3>
          <p><strong>Nombre:</strong> Juan Perez</p>
          <p><strong>Correo:</strong> juan.perez@gmail.com</p>
          <p><strong>Fecha de registro:</strong> 20/01/2025</p>

          {/* BOTÓN DE CAMBIAR CONTRASEÑA */}
          <button onClick={() => setMostrarCambio(true)} className="btn-cambiar-pass">
            Cambiar contraseña
          </button>
        </div>

        <div className="box">
          <h3>Dirección de envío</h3>
          <p>Av la molina 12334</p>
          <p>Lima - Lima</p>
          <p>Celular de contacto: 990892131</p>
        </div>

        <div className="highlight">
          <p>Órdenes</p>
          <h2>12</h2>
        </div>

        <div className="highlight saving">
          <p>Monto ahorrado</p>
          <h2>S/129</h2>
        </div>

        <img
          src="https://i.pravatar.cc/100"
          alt="Perfil"
          className="user-photo"
        />
      </div>

      {/* MENSAJE DE ÉXITO */}
      {showSuccessMsg && (
        <div className="success-message">Su contraseña se ha cambiado correctamente</div>
      )}

      {/* MODAL DE CAMBIO DE CONTRASEÑA */}
      <CambiarPass
        isOpen={mostrarCambio}
        onClose={() => setMostrarCambio(false)}
        onSuccess={() => {
          setMostrarCambio(false)
          setShowSuccessMsg(true)
          setTimeout(() => setShowSuccessMsg(false), 3000)
        }}
      />

      <div className="order-section">
        <h3>Tus órdenes</h3>
        <div className="order-search">
          <input
            type="text"
            placeholder="Buscar una órden..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
          />
          <button>Buscar</button>
        </div>

        <TablaCategorias
          headers={["#ORDEN", "Usuario", "Fecha de órden", "Total", "Estado", "Acciones"]}
          data={currentOrders}
          renderRow={(order, index) => (
            <>
              <td className="order-id">{order.id}</td>
              <td>{order.user}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td className={order.status === "Entregado" ? "success" : "warning"}>
                {order.status}
              </td>
              <td>
                <button className="btn-detail">Ver detalle</button>
              </td>
            </>
          )}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  )
}

export default DetalleUsuario
