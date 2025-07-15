import { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [direccion, setDireccion] = useState(null);
  const limpiarDireccion = () => setDireccion(null);

// Agregar producto
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

//Eliminar producto por ID
  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

//Cambiar cantidad manualmente
  const actualizarCantidad = (id, nuevaCantidad) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

//Vaciar todo el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

//Calcular total
  const obtenerTotal = () => {
    return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarProducto,
        actualizarCantidad,
        vaciarCarrito,
        obtenerTotal,
        direccion,
        setDireccion,
        limpiarDireccion,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
