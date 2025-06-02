import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  'Electrónica',
  'Libros',
  'Ropa',
  'Deportes',
  'Hogar',
  'Videojuegos',
  'Otros'
];

const PublishProduct = ({ onProductSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5000000) {
      setError('La imagen es demasiado grande. Máximo 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (result) {
        setPreviewImage(result);
        setFormData(prev => ({ ...prev, image: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validación básica
    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }
    if (!formData.description.trim()) {
      setError('La descripción es requerida');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setError('El precio debe ser mayor a 0');
      return;
    }
    if (!formData.category) {
      setError('La categoría es requerida');
      return;
    }
    if (!formData.image) {
      setError('La imagen es requerida');
      return;
    }

    // Enviar datos
    onProductSubmit(formData);
    navigate('/');
  };

  return (
    <Container className="py-5">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center mb-4 fw-bold"
            style={{
              background: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2.5rem'
            }}>
          Publicar Nuevo Producto
        </h1>

        {error && (
          <div className="alert alert-danger mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-4 shadow-lg p-4">
          <Form onSubmit={handleSubmit}>
            {/* Imagen */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Imagen del Producto</Form.Label>
              <div className="text-center p-3 border rounded-3">
                {previewImage ? (
                  <div className="position-relative">
                    <img
                      src={previewImage}
                      alt="Vista previa"
                      className="img-fluid mb-2"
                      style={{ maxHeight: '200px', objectFit: 'contain' }}
                    />
                    <Button
                      type="button"
                      variant="link"
                      className="position-absolute top-0 end-0 text-danger"
                      onClick={() => {
                        setPreviewImage(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ) : (
                  <>
                    <i className="bi bi-cloud-upload fs-1 text-primary"></i>
                    <p className="mb-2">Selecciona una imagen</p>
                    <Button
                      type="button"
                      variant="outline-primary"
                      onClick={() => document.getElementById('imageInput').click()}
                    >
                      Seleccionar Archivo
                    </Button>
                  </>
                )}
                <Form.Control
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleImageChange}
                />
              </div>
            </Form.Group>

            {/* Nombre */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: MacBook Pro 2021"
                required
              />
            </Form.Group>

            {/* Categoría */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Categoría</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Descripción */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe tu producto..."
                required
              />
            </Form.Group>

            {/* Precio */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Precio (CLP)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Ej: 150000"
                min="0"
                required
              />
            </Form.Group>

            {/* Botones */}
            <div className="d-flex gap-3 justify-content-end">
              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => navigate('/')}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                style={{
                  background: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
                  border: 'none'
                }}
              >
                Publicar Producto
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default PublishProduct;
