import { useState, useEffect } from "react"
import "./ListaCategorias.css"
import TablaCategorias from "./CateTabla/TablaCategorias.jsx";
import Pagination from "./Paginacion/Pag.jsx"
import filterItems from "../AdminPages/ListaProductos/filterProductos.jsx"
import NewCate from "../Categorias/NuevaCategoria/NewCate.jsx";
import axios from "axios"

function Categorias() {
  const [searchTerm, setSearchTerm] = useState("") 
  const [currentPage, setCurrentPage] = useState(1)
  const [mostrarModalCategoria, setMostrarModalCategoria] = useState(false)
  const [allCategories, setAllCategories] = useState([])
  const itemsPerPage = 7

  useEffect(() => {
    fetchCategorias()
  }, [])

  const fetchCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:3001/Categoria")
      setAllCategories(res.data)
    } catch (error) {
      console.error("Error al obtener categorías:", error)
    }
  }

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      try {
        await axios.delete(`http://localhost:3001/Categoria/${id}`)
        setAllCategories(prev => prev.filter(cat => cat.id !== id))
        alert("Categoría eliminada con éxito.")
      } catch (error) {
        console.error("Error al eliminar categoría:", error)
        alert("Error al eliminar la categoría.")
      }
    }
  }

  const filteredCategories = filterItems(
    allCategories,
    searchTerm,
    ["nombre", "descripcion"]
  )

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCategories = filteredCategories.slice(startIndex, endIndex)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleAddCategory = () => {
    setMostrarModalCategoria(true)
  }

  return (
    <>
      <div className="app-container">
        <NewCate
          isOpen={mostrarModalCategoria}
          onClose={() => {
            setMostrarModalCategoria(false)
            fetchCategorias() // 🔁 Volver a cargar tras agregar
          }}
        />
        <main className="main-content">
          <div className="content-card">
            <div className="card-header">
              <h2 className="card-title">Listado de categorías</h2>
            </div>

            <div className="card-actions">
              <div className="category-search-container">
                <input
                  type="text"
                  placeholder="Buscar una categoría..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="category-search-input"
                />
                <span className="category-search-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </span>
              </div>
              <button onClick={handleAddCategory} className="add-category-button">
                <span>➕</span>
                <span>Agregar categoría</span>
              </button>
            </div>

            <TablaCategorias
              headers={["Nombre", "Descripción", "Acciones"]}
              data={currentCategories}
              renderRow={(category) => (
                <>
                  <td className="category-name">{category.nombre}</td>
                  <td className="category-description">{category.descripcion}</td>
                  <td className="category-actions">
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(category.id)} className="edit-button">
                        ✏️
                      </button>
                      <button onClick={() => handleDelete(category.id)} className="delete-button">
                        🗑️
                      </button>
                    </div>
                  </td>
                </>
              )}
            />

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export default Categorias