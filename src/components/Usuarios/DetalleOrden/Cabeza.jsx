import React from 'react'
import './Cabeza.css'
const Cabeza = () => {
  return (
    <>
    <div className='ordenes'>
    <article>
      <h1>Orden</h1>
      <p>#1234</p>
    </article>
    <main className='estados'>
        <h2>Estado:</h2>
        <h3>Entregado</h3>
      </main>
    <div className='monto'>
        <p>Monto Total:</p>
        <p>S/400</p>
    </div>
    </div>
    <h1 className='productos ordenados'>Productos Ordenados</h1>
    </>
  )
}

export default Cabeza
