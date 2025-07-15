import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../ProductsForm/productForm.jsx";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/producto/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        alert("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const data = {
        id: id,
        nombre: formData.name,
        idCategoria: formData.category,
        descripcion: formData.description,
        stock: formData.stock,
      };

      await axios.put("http://localhost:3001/producto/", data);

      alert("Producto actualizado con éxito");
      navigate("/listaProductos");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Hubo un error al actualizar el producto");
    }
  };

  const handleCancel = () => {
    navigate("/listaProductos");
  };

  if (loading) return <p>Cargando producto...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <ProductForm
      mode="edit"
      initialData={producto}
      onSubmit={handleUpdate}
      onCancel={handleCancel}
    />
  );
}

export default EditProduct;
