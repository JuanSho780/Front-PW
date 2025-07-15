export function filtrarProductos(productos, filtro = '', categoria = '', orden = '') {
  let resultados = productos.filter(p =>
    (p.nombre.includes(filtro) || p.marca.includes(filtro)) &&
    (!categoria || p.categoria === categoria)
  );

  return ordenarProductos(resultados, orden);
}

export function ordenarProductos(productos, orden) {
  if (orden === 'precio') {
    return [...productos].sort((a, b) => a.precio - b.precio);
  }
  if (orden === 'nombre') {
    return [...productos].sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
  return productos;
}
