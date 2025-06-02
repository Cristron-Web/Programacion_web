import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold" style={{ color: '#45B5C4' }}>
          Bazar del Venado 🦌
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            {user && (
              <>
                <Nav.Link as={Link} to="/publish">Publicar</Nav.Link>
                <Nav.Link as={Link} to="/my-products">Mis productos</Nav.Link>
                <Nav.Link as={Link} to="/messages">Mensajes</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
                  <i className="bi bi-person-circle me-1"></i>
                  {user.name}
                </Nav.Link>
                <Nav.Link 
                  onClick={handleLogout}
                  className="text-danger"
                  style={{ cursor: 'pointer' }}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Cerrar sesión
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Iniciar sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <i className="bi bi-person-plus me-1"></i>
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
