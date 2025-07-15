import { useState } from "react"
import TablaCategorias from "../CateTabla/TablaCategorias"
import Pagination from "../Paginacion/Pag"
import "./DeOrden.css"

function DetalleOrden() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const productosOrdenados = [
    { id: "#0223", img: "/img/manzana.png", nombre: "Manzanas Rojas", categoria: "Frutas y verduras", cantidad: 10, total: "S/180.00" },
    { id: "#6425", img: "/img/leche.png", nombre: "Leche gloria", categoria: "Lacteos y huevos", cantidad: 4, total: "S/60.00" },
    { id: "#2344", img: "/img/papaya.png", nombre: "Papaya", categoria: "Frutas y verduras", cantidad: 4, total: "S/80.00" },
    { id: "#4344", img: "/img/sandia.png", nombre: "Sandía", categoria: "Frutas y verduras", cantidad: 12, total: "S/70.00" },
    { id: "#5454", img: "/img/pollo.png", nombre: "Pollo entero fresco con menudencia", categoria: "Carnes, aves y pescados", cantidad: 1, total: "S/90.00" },
    { id: "#8123", img: "/img/uvas.png", nombre: "Uvas", categoria: "Frutas y verduras", cantidad: 1, total: "S/10.00" },
  ]

  const totalPages = Math.ceil(productosOrdenados.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = productosOrdenados.slice(startIndex, startIndex + itemsPerPage)

  const handleCancel = () => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres cancelar esta orden?")
    if (confirmacion) {
      alert("Orden cancelada.")
    }
  }

  return (
    <div className="orden-container">
      <h2>Detalles de Órden</h2>

      <div className="orden-info">
        <h3>Orden <span className="orden-id">#1234</span></h3>
        <div className="orden-detalles-top">
          <p><strong>Estado:</strong> <span className="orden-status">Entregado</span></p>
          <p><strong>Monto total:</strong> S/400.00</p>
        </div>
        <button className="cancelar-orden-btn" onClick={handleCancel}>Cancelar orden</button>
      </div>

      <h4>Productos ordenados</h4>
      <TablaCategorias
        headers={["", "Id", "Nombre", "Categoría", "Cantidad", "Total"]}
        data={currentItems}
        renderRow={(item) => (
          <>
            <td><img src={item.img} alt={item.nombre} className="producto-img" /></td>
            <td className="orden-id-color">{item.id}</td>
            <td>{item.nombre}</td>
            <td className="bold">{item.categoria}</td>
            <td>{item.cantidad}</td>
            <td>{item.total}</td>
          </>
        )}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default DetalleOrden
