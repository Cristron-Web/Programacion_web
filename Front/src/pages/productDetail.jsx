import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();

  // Simulado, reemplazar con fetch desde API
  const product = {
    id,
    title: 'Producto ejemplo',
    description: 'Este es un producto publicado por un estudiante',
    price: 150,
    image: 'https://via.placeholder.com/300',
    seller: 'Juan Pérez'
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text><strong>Precio:</strong> ${product.price}</Card.Text>
          <Card.Text><strong>Vendedor:</strong> {product.seller}</Card.Text>
          <Button variant="primary">Contactar</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetail;
