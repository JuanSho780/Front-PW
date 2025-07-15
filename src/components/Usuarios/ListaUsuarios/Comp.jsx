import React, { useState, useEffect } from 'react';
import Listau from './Listau.jsx';
import './Comp.css'
const Comp = () => {
const valores = [
  {
    id: 1,
    name: "Juan Perez",
    avatar:
      "https://storage.googleapis.com/a1aa/image/965c1b73-9444-4aec-501d-510c203c6d1b.jpg",
    date: "20/01/2025",
    status: "Activo",
    statusColor: "text-green-600 font-semibold",
  },
  {
    id: 2,
    name: "María Gonzales",
    avatar:
      "https://storage.googleapis.com/a1aa/image/59923632-2923-46f1-eddd-c1930d0fb89e.jpg",
    date: "20/01/2025",
    status: "Inactivo",
    statusColor: "text-red-600 font-bold",
  },
  {
    id: 3,
    name: "Marco Aurelio",
    avatar:
      "https://storage.googleapis.com/a1aa/image/afbf5c84-b297-4122-430c-c6f79805c1b5.jpg",
    date: "20/01/2025",
    status: "Activo",
    statusColor: "text-green-600 font-semibold",
  },
  {
    id: 4,
    name: "Ana Días",
    avatar:
      "https://storage.googleapis.com/a1aa/image/b73adc90-49f8-4cfd-4779-81d41e293206.jpg",
    date: "20/01/2025",
    status: "Activo",
    statusColor: "text-green-600 font-semibold",
  },
  {
    id: 5,
    name: "Juan Perez",
    avatar:
      "https://storage.googleapis.com/a1aa/image/965c1b73-9444-4aec-501d-510c203c6d1b.jpg",
    date: "20/01/2025",
    status: "Activo",
    statusColor: "text-green-600 font-semibold",
  },
  {
    id: 6,
    name: "María Gonzales",
    avatar:
      "https://storage.googleapis.com/a1aa/image/59923632-2923-46f1-eddd-c1930d0fb89e.jpg",
    date: "20/01/2025",
    status: "Inactivo",
    statusColor: "text-red-600 font-bold",
  },
  {
    id: 7,
    name: "Marco Aurelio",
    avatar:
      "https://storage.googleapis.com/a1aa/image/afbf5c84-b297-4122-430c-c6f79805c1b5.jpg",
    date: "20/01/2025",
    status: "Activo",
    statusColor: "text-green-600 font-semibold",
  },
  {
    id: 8,
    name: "Ana Días",
    avatar:
      "https://storage.googleapis.com/a1aa/image/b73adc90-49f8-4cfd-4779-81d41e293206.jpg",
    date: "20/01/2025",
    status: "Activo",
    statusColor: "text-green-600 font-semibold",
  },
  {
    id: 9,
    name: "Juan Perez",
    avatar:
      "https://storage.googleapis.com/a1aa/image/965c1b73-9444-4aec-501d-510c203c6d1b.jpg",
    date: "20/01/2025",
    status: "Activo",
    statusColor: "text-green-600 font-semibold",
  },
  {
    id: 10,
    name: "María Gonzales",
    avatar:
      "https://storage.googleapis.com/a1aa/image/59923632-2923-46f1-eddd-c1930d0fb89e.jpg",
    date: "20/01/2025",
    status: "Inactivo",
    statusColor: "text-red-600 font-bold",
  },
  {
    id: 11,
    name: "Marco Aurelio",
    avatar:
      "https://storage.googleapis.com/a1aa/image/afbf5c84-b297-4122-430c-c6f79805c1b5.jpg",
    date: "20/01/2025",
    status: "Activo",
    statusColor: "text-green-600 font-semibold",
  },
  {
    id: 12,
    name: "Ana Días",
    avatar:
      "https://storage.googleapis.com/a1aa/image/b73adc90-49f8-4cfd-4779-81d41e293206.jpg",
    date: "20/01/2025",
    status: "Activo",
    statusColor: "text-green-600 font-semibold",
  },
  {
    id: 13,
    name: "Marco Aurelio",
    avatar:
      "https://storage.googleapis.com/a1aa/image/afbf5c84-b297-4122-430c-c6f79805c1b5.jpg",
    date: "20/01/2025",
    status: "Inactivo",
    statusColor: "text-red-600 font-bold",
  },
];

  const [filteredValue, setFilteredValue] = useState('');
  const [filteredTotal, setFilteredTotal] = useState(valores);

  const filterTotal = () => {
    if (filteredValue.trim() === '') {
      setFilteredTotal(valores);
    } else {
      const resultado = valores.filter(producto =>
        producto.name.toLowerCase().includes(filteredValue.toLowerCase())
      );
      setFilteredTotal(resultado);
    }
  };

  return (
    <>
    <h1>Listado de usuarios</h1>
    <main className="tabla-container">
        <div className='robert'>
      <input
        type="text"
        value={filteredValue}
        onChange={(e) => setFilteredValue(e.target.value)}
        placeholder='Buscar Nombre......'
      />
       <button className='rew' onClick={filterTotal}>Buscar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Fecha de registro</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredTotal.map(producto => (
            <Listau
              key={producto.id}
              avatar={producto.avatar}
              name={producto.name}
              date={producto.date}
              status={producto.status}
              statusColor={producto.statusColor}
            />
          ))}
        </tbody>
      </table>
    </main>
    </>
  );
};

export default Comp;