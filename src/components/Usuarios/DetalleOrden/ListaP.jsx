import React from 'react'

const Listap = ({ img,id,nombre, categoria, stock, total }) => {
  return (
    <tr>
      <td><img src={img} width="50" /></td>
      <td>{id}</td>
      <td>{nombre}</td>
      <td>{categoria}</td>
      <td>{stock}</td>
      <td>{total}</td>
    </tr>
  )
}

export default Listap
