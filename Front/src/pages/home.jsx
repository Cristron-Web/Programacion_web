import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const dummyProducts = [
  {
    id: 1,
    title: 'Libro de Cálculo',
    price: '10.000 CLP',
    image: 'https://via.placeholder.com/300x200?text=Libro',
  },
  {
    id: 2,
    title: 'Laptop usada',
    price: '120.000 CLP',
    image: 'https://via.placeholder.com/300x200?text=Laptop',
  },
  {
    id: 3,
    title: 'Auriculares Bluetooth',
    price: '15.000 CLP',
    image: 'https://via.placeholder.com/300x200?text=Auriculares',
  },
];

const Home = () => {
  return (
    <Container className="py-5">
      {/* Hero */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Bazar del Venado</h1>
        <p className="text-muted fs-5">Compra y vende productos con tus compañeros de universidad</p>
      </div>

      {/* Grid de productos */}
      <Row className="g-4">
        {dummyProducts.map((product) => (
          <Col key={product.id} md={4}>
            <Card className="shadow-sm h-100 border-0 rounded-4">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-semibold">{product.title}</Card.Title>
                <Card.Text className="text-primary fw-bold">{product.price}</Card.Text>
                <Button variant="outline-primary" className="mt-auto">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
