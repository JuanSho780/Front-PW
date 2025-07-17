import { useState, useRef, useEffect } from "react";
import "./productForm.css";
import NewCate from "../../Categorias/NuevaCategoria/NewCate.jsx";
import axios from "axios";

function ProductForm({
  mode = "add", // "add" o "edit"
  initialData = null,
  onSubmit,
  onCancel,
}) {
  const [mostrarModalCategoria, setMostrarModalCategoria] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    presentation: "",
    category: "",
    description: "",
    stock: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  // Cargar categorías dinámicamente desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3001/Categoria/");
        setCategories(res.data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  // Cargar datos iniciales si estamos en modo edición
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name || initialData.nombre || "",
        presentation: initialData.presentation || initialData.presentacion || "",
        category: initialData.category || initialData.idCategoria || "",
        description: initialData.description || initialData.descripcion || "",
        stock: initialData.stock || initialData.cantidad || "",
        image: null, // No cargamos archivo directamente
      });

      // Mostrar imagen si existe
      if (initialData.imageUrl || initialData.image) {
        setImagePreview(initialData.imageUrl || initialData.image);
      }
    }
  }, [mode, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, image: file }));
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("dragover");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, image: file }));
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };

  const handleSelectImage = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleAddCategory = () => {
    setMostrarModalCategoria(true);
  };

  const title = mode === "add" ? "Agregar un producto" : "Editar producto";
  const buttonText = mode === "add" ? "+ Crear producto" : "✏️ Editar producto";

  return (
    <div className="product-form-container">
      <div className="form-header">
        <h1>{title}</h1>
      </div>

      <div className="product-form-wrapper">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="name">Nombre del producto</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nombre del producto"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="presentation">Presentación</label>
                <input
                  type="text"
                  id="presentation"
                  name="presentation"
                  placeholder="Ej: 1kg, 500ml, paquete x6"
                  value={formData.presentation}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Categoría</label>
                <div className="category-container">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Selecciona la categoría del producto
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="add-category-btn"
                    onClick={handleAddCategory}
                  >
                    +
                  </button>
                </div>

                <NewCate
                  isOpen={mostrarModalCategoria}
                  onClose={() => setMostrarModalCategoria(false)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Descripción del producto..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  required
                ></textarea>
              </div>
            </div>

            <div className="form-right">
              <div className="form-group">
                <label>Imagen {mode === "edit" ? "- Cambiar" : ""}</label>
                <div
                  className="image-upload-area"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      className="image-preview"
                    />
                  ) : (
                    <>
                      <div className="image-placeholder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="64"
                          height="64"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#aaaaaa"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </div>
                      <p>Arrastra una imagen aquí</p>
                      <p>o</p>
                    </>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  <button
                    type="button"
                    className="select-image-btn"
                    onClick={handleSelectImage}
                  >
                    {mode === "edit" ? "Cambiar imagen" : "Seleccionar imagen"}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="Cantidad en stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            {mode === "edit" && onCancel && (
              <button type="button" className="cancel-btn" onClick={onCancel}>
                Cancelar
              </button>
            )}
            <button type="submit" className="submit-btn">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;