import React, { useState, useEffect } from 'react';
import "./resultados.css";
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer/Footer.jsx";

function Resultados() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [orden, setOrden] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/producto')
      .then(res => res.json())
      .then(data => {
        const productosConPrecioNumerico = data.map(p => ({
          ...p,
          precio: Number(p.precio)
        }));
        setProductos(productosConPrecioNumerico);
      })
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/categoria')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error("Error al cargar categorías:", err));
  }, []);

  const handleAgregarAlCarrito = async (productoId) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/Carrito/add-item/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idUsuario: usuario.id,
          idProducto: productoId,
          cantidad: 1
        })
      });

      if (res.ok) {
        alert('Producto agregado al carrito');
      } else {
        alert('Error al agregar al carrito');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al intentar agregar el producto');
    }
  };

  const productosFiltrados = productos
    .filter(p =>
      (!categoriaSeleccionada || p.categoria.id === categoriaSeleccionada) &&
      (!filtro || p.nombre.toLowerCase().includes(filtro.toLowerCase()))
    )
    .sort((a, b) => {
      if (orden === 'nombre') return a.nombre.localeCompare(b.nombre);
      if (orden === 'precio') return a.precio - b.precio;
      return 0;
    });

  return (
    <div className="landing-container">
      <div className="contenedor-resultados">
        {/* Sidebar con categorías */}
        <aside className="filtro-categorias">
          <h4>Categorías</h4>
          <ul>
            <li
              className={!categoriaSeleccionada ? 'seleccionado' : ''}
              onClick={() => setCategoriaSeleccionada('')}
            >
              Todas
            </li>
            {categorias.map(cat => (
              <li
                key={cat.id}
                className={categoriaSeleccionada === cat.id ? 'seleccionado' : ''}
                onClick={() => setCategoriaSeleccionada(cat.id)}
              >
                {cat.nombre}
              </li>
            ))}
          </ul>
        </aside>

        {/* Contenido principal */}
        <main className="contenido-resultados">
          <div className="barra-filtros">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={filtro}
              onChange={e => setFiltro(e.target.value)}
            />
            <select onChange={e => setOrden(e.target.value)} value={orden}>
              <option value="">Ordenar por</option>
              <option value="nombre">Nombre</option>
              <option value="precio">Precio</option>
            </select>
          </div>

          <div className="lista-productos">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map(p => (
                <div className="producto-card" key={p.id}>
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="producto-img"
                    onClick={() => navigate(`/producto/${p.id}`)}
                  />
                  <h5>{p.nombre}</h5>
                  <p>{p.categoria.nombre}</p>
                  <p>S/{p.precio.toFixed(2)}</p>
                  <p>Marca: {p.marca}</p>
                  <button onClick={() => handleAgregarAlCarrito(p.id)} className="agregar-btn">
                    Agregar
                  </button>
                </div>
              ))
            ) : (
              <p>No se encontraron productos con esos criterios.</p>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Resultados;
