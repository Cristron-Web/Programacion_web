import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const PublishProduct = () => {
  const [form, setForm] = useState({ title: '', description: '', price: '', image: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Producto publicado:', form);
    // Llamada a API para publicar producto
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h3>Publicar producto</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control name="title" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" name="description" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" name="price" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL de la imagen</Form.Label>
          <Form.Control name="image" onChange={handleChange} />
        </Form.Group>
        <Button type="submit" variant="success">Publicar</Button>
      </Form>
    </Container>
  );
};

export default PublishProduct;
