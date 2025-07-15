import React, { useState } from 'react';
import ih from '../../../../public/img/accion.png';
import Cabeza from './Cabeza';
import './Cabeza.css'
import ListaP from './ListaP';
const Orden = () => {
    const valores=[
         {
            img:'https://www.bupasalud.com/sites/default/files/inline-images/fuji-red.jpg',
            id:"#0223",
            nombre:"Manzanas Rojas",
            presentacion:0.3,
            descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ....',
            categoria:'Frutas y verduras',
            stock:10,
            total:19

        },
         {
            img:'https://www.miamarket.pe/assets/uploads/b23929e1fd650abfe060a8015ae3c164.png',
            id:"#6425",
            nombre:"Leche gloria",
            presentacion:6,
            descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ....',
            categoria:'Lacteos y huevos',
            stock:4,
            total:19

        },
        {
            img:'https://lirp.cdn-website.com/586fb047/dms3rep/multi/opt/papaya-1920w.jpg',
            id:"#2344",
            nombre:"Papaya",
            presentacion:0.8,
            descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ....',
            categoria:'Frutas y verduras',
            stock:4,
            total:19

        },
         {
            img:'	https://libera.pe/wp-content/uploads/2022/02/sandia-1080x675.jpg',
            id:"#4344",
            nombre:"Sandía",
            presentacion:1,
            descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ....',
            categoria:'Frutas y verduras',
            stock:12,
            total:19

        },
        {
            img:'https://www.avicolaramavi.com/wp-content/webp-express/webp-images/uploads/2024/05/pollo-1.png.webp',
            id:"#5454",
            nombre:"Pollo entero fresco con menudencia",
            presentacion:2.2,
            descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ....',
            categoria:'Carnes, aves y pescados',
            stock:1,
            total:19
          

        },
        {
            img:'https://fundaciondelcorazon.com/images/stories/corazon-facil/impulso-vital/uvas.jpg',
            id:"#8123",
            nombre:"Uvas",
            presentacion:0.8,
            descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ....',
            categoria:'Frutas y verduras',
            stock:1,
            total:19

        }
    ]
    const [filteredValue, setFilteredValue] = useState('');
    const [filteredTotal, setFilteredTotal] = useState(valores);
  return (
    <>
    <h1>Detalles de Orden</h1>
    <div className='encabezado'>
    <Cabeza/>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Id</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {
          filteredTotal.map(producto => (
            <ListaP
              key={producto.id}
              img={producto.img}
              id={producto.id}
              nombre={producto.nombre}
              categoria={producto.categoria}
              stock={producto.stock}
            total={producto.total}
            />
          ))
        }
      </tbody>
    </table>
    </div>
    </>
  )
}

export default Orden
