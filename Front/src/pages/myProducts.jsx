import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../routes/appRoutes';
import { useAuth } from '../context/AuthContext';

const MyProducts = () => {
  const navigate = useNavigate();
  const { getUserProducts } = useProducts();
  const { user } = useAuth();
  const products = getUserProducts(user.id);

  return (
    <Container className="py-5">
      <h2 className="mb-4">Mis Productos</h2>
      
      {products.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-box-seam display-1 text-muted mb-3"></i>
          <h3>No has publicado productos aún</h3>
          <Button 
            onClick={() => navigate('/publish')}
            variant="primary"
            className="mt-3"
            style={{
              backgroundColor: '#45B5C4',
              border: 'none'
            }}
          >
            Publicar mi primer producto
          </Button>
        </div>
      ) : (
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} md={4}>
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="h-100 shadow-sm border-0 rounded-4">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ 
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="text-muted">{product.description}</Card.Text>
                    <div className="mt-auto">
                      <Card.Text className="text-primary fw-bold mb-3">
                        $ {product.price}
                      </Card.Text>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="w-100"
                        >
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyProducts;
