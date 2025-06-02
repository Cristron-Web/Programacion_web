import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useProducts } from '../routes/appRoutes';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

const Messages = () => {
  const { user } = useAuth();
  const { getUserChats, sendMessage } = useChat();
  const { getProductById } = useProducts();
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState([]);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Cargar chats iniciales
  useEffect(() => {
    setChats(getUserChats(user.id));
  }, [user.id, getUserChats]);

  // Scroll automático al enviar mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    // Enviar mensaje
    sendMessage(selectedChat.id, user.id, newMessage.trim());
    
    // Actualizar la lista de chats local
    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, {
            id: Date.now(),
            userId: user.id,
            content: newMessage.trim(),
            timestamp: new Date().toISOString()
          }]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setSelectedChat(updatedChats.find(chat => chat.id === selectedChat.id));
    setNewMessage('');
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy HH:mm', { locale: es });
    } catch (error) {
      return dateString;
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // Limpiar el campo de mensaje al cambiar de chat
    setNewMessage('');
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Mensajes</h2>
      <Row>
        {/* Lista de chats */}
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-0">
              {chats.length === 0 ? (
                <div className="text-center p-4">
                  <p className="text-muted mb-0">No tienes conversaciones activas</p>
                </div>
              ) : (
                <div className="chat-list">
                  {chats.map(chat => {
                    const product = getProductById(chat.productId.toString());
                    const isUserBuyer = chat.buyerId === user.id;
                    const lastMessage = chat.messages[chat.messages.length - 1];
                    return (
                      <div
                        key={chat.id}
                        className={`chat-item p-3 border-bottom ${selectedChat?.id === chat.id ? 'bg-light' : ''}`}
                        onClick={() => handleChatSelect(chat)}
                        style={{ cursor: 'pointer' }}
                      >
                        <h6 className="mb-1">{product?.name || 'Producto no disponible'}</h6>
                        <small className="text-muted d-block">
                          {isUserBuyer ? 'Vendedor: ' : 'Comprador: '}
                          {lastMessage 
                            ? `Último mensaje: ${formatDate(lastMessage.timestamp)}`
                            : 'Sin mensajes'}
                        </small>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Área de chat */}
        <Col md={8}>
          <Card className="shadow-sm border-0" style={{ height: '600px' }}>
            {selectedChat ? (
              <>
                <Card.Header className="bg-white border-bottom">
                  <h5 className="mb-0">
                    {getProductById(selectedChat.productId.toString())?.name || 'Producto no disponible'}
                  </h5>
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                  <div 
                    className="flex-grow-1 overflow-auto mb-3"
                    ref={chatContainerRef}
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {selectedChat.messages.map(message => (
                      <div
                        key={message.id}
                        className={`d-flex mb-3 ${message.userId === user.id ? 'justify-content-end' : 'justify-content-start'}`}
                      >
                        <div
                          className={`p-3 rounded-3 ${
                            message.userId === user.id
                              ? 'bg-primary text-white'
                              : 'bg-light'
                          }`}
                          style={{ maxWidth: '75%' }}
                        >
                          <p className="mb-1">{message.content}</p>
                          <small className={message.userId === user.id ? 'text-white-50' : 'text-muted'}>
                            {formatDate(message.timestamp)}
                          </small>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  <Form onSubmit={handleSendMessage}>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                      />
                      <Button 
                        type="submit"
                        style={{
                          backgroundColor: '#45B5C4',
                          border: 'none'
                        }}
                      >
                        Enviar
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </>
            ) : (
              <Card.Body className="d-flex align-items-center justify-content-center">
                <div className="text-center text-muted">
                  <i className="bi bi-chat-dots display-4"></i>
                  <p className="mt-2">Selecciona una conversación para comenzar</p>
                </div>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Messages; 