import "./CaPass.css"
import { useState } from "react"

function CambiarPass({ isOpen, onClose }) {
  const [showMsg, setShowMsg] = useState(false)

  if (!isOpen) return null

  const handleChangePassword = () => {
    setShowMsg(true)
    setTimeout(() => {
      setShowMsg(false)
      onClose()
    }, 2500) // 2.5 segundos antes de cerrar
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cambiar contraseña</h2>

        <label>Contraseña actual</label>
        <input type="password" placeholder="Ingresa tu contraseña actual" />

        <label>Nueva contraseña</label>
        <input type="password" placeholder="Ingresa la nueva contraseña" />

        <label>Confirmar nueva contraseña</label>
        <input type="password" placeholder="Confirma la nueva contraseña" />

        <div className="modal-actions">
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
          <button className="btn-guardar" onClick={handleChangePassword}>
            Cambiar contraseña
          </button>
        </div>

        {showMsg && <p className="msg-exito">✅ SE CAMBIÓ DE CONTRASEÑA</p>}
      </div>
    </div>
  )
}

export default CambiarPass

