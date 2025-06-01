import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Image } from 'react-bootstrap';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'Juan Estudiante',
    email: 'juan@universidad.cl',
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData({ ...userData, profileImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Datos actualizados:', userData);
    // Aquí se puede enviar al backend
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="p-4 shadow rounded-4 w-100" style={{ maxWidth: '600px' }}>
        <h3 className="mb-4 fw-bold text-center">Mi Perfil</h3>
        <Form onSubmit={handleSave}>
          <Row className="mb-4 justify-content-center">
            <Col xs="auto">
              <div className="position-relative">
                <Image
                  src={
                    previewImage ||
                    'https://via.placeholder.com/150?text=Foto+Perfil'
                  }
                  roundedCircle
                  width={150}
                  height={150}
                  style={{ objectFit: 'cover' }}
                />
                <Form.Label
                  htmlFor="profileImage"
                  className="position-absolute bottom-0 end-0 bg-primary text-white px-2 py-1 rounded-circle"
                  style={{ cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  ✏️
                </Form.Label>
                <Form.Control
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="d-none"
                />
              </div>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Guardar cambios
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Profile;
