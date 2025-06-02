import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!formData.email.trim() || !formData.password) {
      setError('Todos los campos son requeridos');
      return;
    }

    // Simulación de verificación de credenciales
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find(u => 
      u.email === formData.email && u.password === formData.password
    );

    if (user) {
      login(user);
      navigate('/');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-center">
        <Card className="p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center mb-4">Iniciar sesión</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Tu contraseña"
              />
            </Form.Group>

            <Button 
              type="submit" 
              className="w-100"
              style={{
                backgroundColor: '#45B5C4',
                border: 'none'
              }}
            >
              Iniciar sesión
            </Button>

            <div className="text-center mt-3">
              <span className="text-muted">¿No tienes cuenta? </span>
              <Button 
                variant="link" 
                onClick={() => navigate('/register')}
                className="p-0 ms-1"
              >
                Regístrate
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
