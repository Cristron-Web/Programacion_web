import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // Aquí puedes hacer el fetch/post al backend
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="p-4 shadow rounded-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4 fw-bold">Iniciar sesión</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Correo o Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu correo o usuario"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Entrar
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
