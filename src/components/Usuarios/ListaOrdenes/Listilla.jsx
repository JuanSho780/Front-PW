import { useState,useEffect } from 'react';
import Lr from "../ListaOrdenes/Lr.jsx";
import "./Listilla.css";
const Listilla = () => {
    const valores = [
  {
    id: "#1234",
    name: "Juan Perez",
    date: "20/01/2025",
    status: "Entregado",
    total: '199.00',
    statusColor: "text-green-600 font-semibold",
  },
  {
    id: "#1235",
    name: "María Gonzales",
    date: "20/01/2025",
    status: "Por entregar",
    total: '199.00',
    statusColor: "text-red-600 font-bold",
  },
  {
    id:"#1236",
    name: "Marco Aurelio",
    date: "20/01/2025",
    status: "Entregado",
    total: '199.00',
    statusColor: "text-green-600 font-semibold",
  },
  {
    id: "#1237",
    name: "Ana Días",
    date: "20/01/2025",
    status: "Entregado",
    total: '199.00',
    statusColor: "text-green-600 font-semibold",
  },
  {
    id: "#1238",
    name: "Juan Perez",
    date: "20/01/2025",
    status: "Entregado",
    total: '199.00',
    statusColor: "text-green-600 font-semibold",
  },
  {
    id:"#1239",
    name: "María Gonzales",
    date: "20/01/2025",
    status: "Por entregar",
    total: '199.00',
    statusColor: "text-red-600 font-bold",
  },
  {
    id:"#1231",
    name: "Marco Aurelio",
    date: "20/01/2025",
    status: "Entregado",
    total: '199.00',
    statusColor: "text-green-600 font-semibold",
  },
  {
    id:"#1232",
    name: "Ana Días",
    date: "20/01/2025",
    status: "Entregado",
    total: '199.00',
    statusColor: "text-green-600 font-semibold",
  },
  {
    id:"#1233",
    name: "Juan Perez",
    date: "20/01/2025",
    status: "Entregado",
    total: '199.00',
    statusColor: "text-green-600 font-semibold",
  },
  {
    id:"#1230",
    name: "María Gonzales",
    date: "20/01/2025",
    status: "Por entregar",
    total: '199.00',
    statusColor: "text-red-600 font-bold",
  },
  {
    id: "#1244",
    name: "Marco Aurelio",
    date: "20/01/2025",
    status: "Entregado",
    total: '199.00',
    statusColor: "text-green-600 font-semibold",

  },
  {
    id: "#1241",
    name: "Ana Días",
    date: "20/01/2025",
    status: "Entregado",
    total: '199.00',
    statusColor: "text-green-600 font-semibold",
  },
  {
    id: "#1242",
    name: "Marco Aurelio",
    date: "20/01/2025",
    status: "Por entregar",
    total: '199.00',
    statusColor: "text-red-600 font-bold",
  },
];
    const [filteredValue,setfilteredValue]=useState('')
    const [filteredTotal, setfilteredTotal] = useState(valores);
    const filterTotal = () => {
    const resultadosFiltrados = valores.filter((producto) =>
      producto.id.toLowerCase().includes(filteredValue.toLowerCase())
    );
    setfilteredTotal(resultadosFiltrados);
  };
 useEffect(()=>{
        if(filteredValue===""){
            setfilteredTotal(valores)
        }

    },[filteredValue])
  return (
    <div>
        <h1>Lista de ordenes</h1>
        <div className='robert'>
      <input
        type="text"
        value={filteredValue}
        onChange={(e) => setfilteredValue(e.target.value)}
        placeholder='Buscar por orden......'
      />
       <button className='rew' onClick={filterTotal}>Buscar</button>
      </div>
      <table>
        <thead>
          <tr><th>#Orden</th>
          <th>Usuario</th>
          <th>Fecha de orden</th>
          <th>Total</th>
          <th>Estado</th>
          <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredTotal.map(producto => (
            <Lr
              id={producto.id}
              name={producto.name}
              date={producto.date}
              status={producto.status}
              total={producto.total}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Listilla
