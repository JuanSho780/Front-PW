import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductForm from "../ProductsForm/productForm.jsx"
import axios from "axios";

function AddProduct() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const data = {
        nombre: formData.name,
        idCategoria: formData.category,
        descripcion: formData.description,
        stock: formData.stock,
        marca: "Productos Genericos Perú Sac",
        precio: 5,
        imagen: "https://example.com/default-image.jpg",
      };

      await axios.post("http://localhost:3001/producto/", data);

      alert("Producto creado con éxito");
      navigate("/listaProductos");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Hubo un error al crear el producto");
    }
  }

  const handleCancel = () => {
    navigate("/listaProductos");
  };

  return <ProductForm mode="add" onSubmit={handleSubmit} onCancel={handleCancel} />
}

export default AddProduct
