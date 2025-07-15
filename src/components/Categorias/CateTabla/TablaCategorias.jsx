// src/components/common/TablaCategorias.jsx
import React from 'react'
import './GenericTable.css'

const TablaCategorias = ({ headers, data, renderRow }) => {
  return (
    <div className="table-container">
      <table className="categories-table">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>{renderRow(item, index)}</tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="no-results">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TablaCategorias
