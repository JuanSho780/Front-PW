import React, { useState, useEffect } from "react";
import "./listaProductos.css";
import Pagination from "../../Categorias/Paginacion/Pag";
import filterItems from "./filterProductos.jsx";
import { useNavigate } from 'react-router-dom';
import TablaCategorias from "../../Categorias/CateTabla/TablaCategorias.jsx";
import axios from 'axios';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const productsPerPage = 7;
  const navigate = useNavigate();

  // 📌 Fetch productos y categorías
  useEffect(() => {
    const loadData = async () => {
      const [resProd, resCat] = await Promise.all([
        axios.get('http://localhost:3001/producto'),
        axios.get('http://localhost:3001/Categoria'),
      ]);
      setProducts(resProd.data);
      setCategories(resCat.data.map(c => c.nombre));
    };
    loadData();
  }, []);

  // 📊 Filtrado y paginación
  const filtered = filterItems(products, searchTerm, ['id', 'nombre', 'descripcion'], { categoria: selectedCategory });
  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const currentProducts = filtered.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  // 🗑️ Eliminar con confirm y endpoint
  const handleDelete = async (id) => {
    if (!confirm("Eliminar este producto?")) return;
    try {
      await axios.delete(`http://localhost:3001/producto/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  return (
    <div className="products-container">
      <h1>Listado de productos</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar un producto..."
          value={searchTerm}
          onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
        <button className="search-btn">🔍 Buscar</button>
        <button className="categories-btn" onClick={() => navigate('/categorias')}>📋 Categorías</button>
        <button className="add-product-btn" onClick={() => navigate('/agregarProducto')}>➕ Agregar producto</button>
      </div>

      <div className="category-filter">
        <select value={selectedCategory} onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(1); }}>
          <option value="">Todas las categorías</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="products-table">
        <TablaCategorias
          class="transactions-table-principal"
          headers={["Id", "Nombre", "Presentación", "Descripción", "Categoría", "Stock", "Acciones"]}
          data={currentProducts}
          renderRow={item => (
            <>
              <td><span className="product-id">{item.id}</span></td>
              <td>
                <span className="product-emoji">{item.imagen ? <img src={item.imagen} alt={item.nombre} width="24" /> : '📦'}</span>
                <span>{item.nombre}</span>
              </td>
              <td>{item.presentacion || '-'}</td>
              <td className="description-cell">{item.descripcion}</td>
              <td>{item.categoria?.nombre || item.categoria}</td>
              <td><span className="stock-number">{item.stock}</span></td>
              <td>
                <button onClick={() => navigate(`/modificarProducto/${item.id}`)} className="edit-btn">✏️</button>
                <button onClick={() => handleDelete(item.id)} className="delete-btn">🗑️</button>
              </td>
            </>
          )}
        />
        {filtered.length === 0 && <p>No se encontraron productos.</p>}
        
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>
    </div>
  );
}

export default ProductsList;
