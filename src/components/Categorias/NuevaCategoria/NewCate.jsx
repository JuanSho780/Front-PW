import "./NuevaCat.css";
import { useState, useEffect } from "react";
import axios from "axios";

function NewCate({ isOpen, onClose }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  if (!isOpen) return null;

  const handleAgregar = async () => {
    try {
      const imagen = "https://example.com/default-image.jpg";
      await axios.post("http://localhost:3001/Categoria", {
        nombre,
        descripcion,
        imagen
      });

      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        onClose();
      }, 2500);
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      alert("Ocurrió un error al agregar la categoría");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Nueva categoría</h2>

        <label>Nombre de la categoría</label>
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Descripción</label>
        <textarea
          placeholder="Descripción del producto..."
          rows="3"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-guardar" onClick={handleAgregar}>
            Agregar categoría
          </button>
        </div>

        {showMsg && <p className="msg-exito">✅ CATEGORÍA AGREGADA</p>}
      </div>
    </div>
  );
}

export default NewCate;
