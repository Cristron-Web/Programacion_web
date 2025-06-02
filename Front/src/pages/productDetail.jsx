import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { useProducts } from '../routes/appRoutes';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { user } = useAuth();
  const { createChat } = useChat();
  const product = getProductById(id);

  const handleContactSeller = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.id === product.seller.id) {
      navigate('/messages');
      return;
    }

    const chatId = createChat(user.id, product.seller.id, product.id);
    navigate('/messages');
  };

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Producto no encontrado</h2>
        <Button 
          variant="outline-primary" 
          onClick={() => navigate('/')}
          className="mt-3"
        >
          Volver al inicio
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-center">
        <Card className="border-0 shadow-sm" style={{ maxWidth: '800px', width: '100%' }}>
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6">
              <Card.Body className="p-4">
                <h2 className="mb-3">{product.name}</h2>
                <p className="text-muted mb-4">
                  {product.description}
                </p>
                <h3 className="text-primary mb-4" style={{ color: '#007bff' }}>
                  $ {product.price}
                </h3>
                <p className="mb-4">
                  <strong>Vendedor:</strong>{' '}
                  <span className="text-primary">
                    <i className="bi bi-person-circle me-1"></i>
                    {product.seller?.name || 'Vendedor no especificado'}
                  </span>
                </p>
                <div className="d-grid gap-2">
                  <Button 
                    className="py-2"
                    style={{
                      backgroundColor: '#45B5C4',
                      border: 'none',
                      borderRadius: '4px'
                    }}
                    onClick={handleContactSeller}
                  >
                    {user?.id === product.seller.id 
                      ? 'Ver mis mensajes' 
                      : 'Contactar Vendedor'}
                  </Button>
                  <Button 
                    variant="outline-secondary"
                    className="py-2"
                    onClick={() => navigate('/')}
                  >
                    Volver al inicio
                  </Button>
                </div>
              </Card.Body>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default ProductDetail;
