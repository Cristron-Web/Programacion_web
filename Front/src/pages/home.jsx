import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/global.css';

const CATEGORIES = [
  'Todas',
  'Electrónica',
  'Libros',
  'Ropa',
  'Deportes',
  'Hogar',
  'Videojuegos',
  'Otros'
];

const Home = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategories, setActiveCategories] = useState(new Set(['Todas']));

  useEffect(() => {
    // Obtener categorías únicas de los productos
    const uniqueCategories = new Set(['Todas']);
    products.forEach(product => {
      if (product.category) {
        uniqueCategories.add(product.category);
      }
    });
    setActiveCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    if (selectedCategory === 'Todas') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-4"
            style={{
              background: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
          Bazar del Venado
        </h1>
        <p className="lead text-muted">
          Compra y vende productos con tus compañeros de universidad.
        </p>
      </div>

      {/* Filtro de categorías */}
      <div className="mb-4">
        <h5 className="mb-3">Categorías</h5>
        <div className="d-flex flex-wrap gap-2">
          {CATEGORIES.map(category => (
            activeCategories.has(category) && (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline-primary"}
                onClick={() => handleCategoryChange(category)}
                style={{
                  backgroundColor: selectedCategory === category ? '#45B5C4' : 'transparent',
                  borderColor: '#45B5C4',
                  color: selectedCategory === category ? 'white' : '#45B5C4'
                }}
              >
                {category}
              </Button>
            )
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <h3 className="text-muted">No hay productos en esta categoría</h3>
          <p>¡Sé el primero en publicar!</p>
          <Link to="/publish">
            <Button
              style={{
                backgroundColor: '#45B5C4',
                border: 'none'
              }}
            >
              Publicar Producto
            </Button>
          </Link>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredProducts.map(product => (
            <Col key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-100 shadow-sm border-0">
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.name}
                      style={{ height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="text-muted mb-2">
                      {product.description.length > 100
                        ? `${product.description.substring(0, 100)}...`
                        : product.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 mb-0">$ {product.price}</span>
                      <Link to={`/product/${product.id}`}>
                        <Button
                          variant="outline-primary"
                          style={{
                            borderColor: '#45B5C4',
                            color: '#45B5C4'
                          }}
                        >
                          Ver más
                        </Button>
                      </Link>
                    </div>
                    {product.category && (
                      <div className="mt-2">
                        <span className="badge bg-light text-dark">
                          {product.category}
                        </span>
                      </div>
                    )}
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

export default Home;
