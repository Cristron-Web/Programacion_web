import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Image, Alert, Spinner } from 'react-bootstrap';
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock } from 'react-icons/fa';
import { usuariosService } from '../services/api';

const Profile = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
    profileImage: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      // Obtener el slug del usuario del localStorage o de donde lo tengas guardado
      const userSlug = localStorage.getItem('userSlug');
      if (!userSlug) {
        throw new Error('No se encontró información del usuario');
      }

      const userData = await usuariosService.obtenerUsuario(userSlug);
      setFormData({
        nombre: userData.nombre,
        apellidoPaterno: userData.apellidoPaterno,
        apellidoMaterno: userData.apellidoMaterno,
        email: userData.email,
        telefono: userData.telefono || '',
        direccion: userData.direccion || '',
        password: '',
        profileImage: null
      });
      setOriginalData(userData);
      if (userData.profileImage) {
        setPreviewImage(userData.profileImage);
      }
    } catch (error) {
      showAlertMessage('Error al cargar los datos del usuario', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showAlertMessage('La imagen no debe superar los 5MB', 'danger');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({ ...prev, profileImage: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const showAlertMessage = (message, variant = 'success') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userSlug = localStorage.getItem('userSlug');
      
      const updateData = {
        slug: userSlug,
        nombre: formData.nombre,
        apellidoPaterno: formData.apellidoPaterno,
        apellidoMaterno: formData.apellidoMaterno,
        nombreUsuario: originalData.nombreUsuario,
        contraseña: formData.password || undefined,
        habilitado: true
      };

      await usuariosService.modificarUsuario(userSlug, updateData);
      showAlertMessage('¡Perfil actualizado con éxito!');
      setIsEditing(false);
      await loadUserData(); // Recargar datos actualizados
    } catch (error) {
      showAlertMessage('Error al actualizar el perfil: ' + error.message, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      ...originalData,
      password: ''
    });
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" style={{ color: '#2193b0' }}>
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="border-0 shadow-lg rounded-4">
            <div className="position-relative">
              <div 
                className="rounded-top-4 text-white p-4"
                style={{ 
                  height: '150px',
                  background: 'linear-gradient(45deg, #2193b0, #6dd5ed)'
                }}
              >
                <h3 className="mb-0 text-center">Mi Perfil</h3>
              </div>
              <div className="text-center">
                <div 
                  className="position-relative d-inline-block"
                  style={{ marginTop: '-75px' }}
                >
                  <Image
                    src={previewImage || 'https://via.placeholder.com/150?text=Foto+Perfil'}
                    roundedCircle
                    width={150}
                    height={150}
                    className="border border-4 border-white shadow"
                    style={{ objectFit: 'cover', backgroundColor: 'white' }}
                  />
                  {isEditing && (
                    <>
                      <Form.Label
                        htmlFor="profileImage"
                        className="position-absolute bottom-0 end-0 text-white p-2 rounded-circle shadow-sm"
                        style={{ 
                          cursor: 'pointer', 
                          margin: '0.5rem',
                          background: 'linear-gradient(45deg, #2193b0, #6dd5ed)'
                        }}
                      >
                        <FaCamera size={20} />
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="d-none"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <Card.Body className="p-4">
              {showAlert && (
                <Alert variant={alertVariant} className="mb-4">
                  {alertMessage}
                </Alert>
              )}

              <Form onSubmit={handleSave}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <FaUser className="me-2" style={{ color: '#2193b0' }} /> Nombre
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="rounded-3"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido Paterno</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellidoPaterno"
                        value={formData.apellidoPaterno}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="rounded-3"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido Materno</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellidoMaterno"
                        value={formData.apellidoMaterno}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="rounded-3"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <FaEnvelope className="me-2" style={{ color: '#2193b0' }} /> Correo
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="rounded-3"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <FaPhone className="me-2" style={{ color: '#2193b0' }} /> Teléfono
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="rounded-3"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="d-flex align-items-center">
                        <FaMapMarkerAlt className="me-2" style={{ color: '#2193b0' }} /> Dirección
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="rounded-3"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {isEditing && (
                  <Form.Group className="mb-4">
                    <Form.Label className="d-flex align-items-center">
                      <FaLock className="me-2" style={{ color: '#2193b0' }} /> Contraseña
                    </Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Dejar en blanco para mantener la actual"
                        className="rounded-start-3"
                      />
                      <Button 
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        className="rounded-end-3"
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </Button>
                    </div>
                  </Form.Group>
                )}

                <div className="d-flex gap-2">
                  {!isEditing ? (
                    <Button 
                      type="button"
                      className="w-100 rounded-3"
                      onClick={() => setIsEditing(true)}
                      style={{
                        background: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
                        border: 'none'
                      }}
                    >
                      Editar Perfil
                    </Button>
                  ) : (
                    <>
                      <Button 
                        type="submit" 
                        className="w-50 rounded-3"
                        style={{
                          background: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
                          border: 'none'
                        }}
                      >
                        Guardar Cambios
                      </Button>
                      <Button 
                        type="button"
                        variant="outline-secondary" 
                        className="w-50 rounded-3"
                        onClick={handleCancel}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
