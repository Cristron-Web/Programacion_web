import React from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

const MyProducts = () => {
  const products = [
    { id: 1, title: 'Tablet', price: 100 },
    { id: 2, title: 'Mochila', price: 40 },
  ];

  return (
    <Container className="mt-4">
      <h3>Mis productos</h3>
      <ListGroup>
        {products.map(p => (
          <ListGroup.Item key={p.id} className="d-flex justify-content-between align-items-center">
            {p.title} - ${p.price}
            <Button variant="danger" size="sm">Eliminar</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default MyProducts;
