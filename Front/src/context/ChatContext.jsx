import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext(null);

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem('chats');
    return savedChats ? JSON.parse(savedChats) : [];
  });

  const createChat = (buyerId, sellerId, productId) => {
    const chatId = `${buyerId}-${sellerId}-${productId}`;
    const existingChat = chats.find(chat => chat.id === chatId);
    
    if (!existingChat) {
      const newChat = {
        id: chatId,
        buyerId,
        sellerId,
        productId,
        messages: [],
        createdAt: new Date().toISOString()
      };
      
      setChats(prevChats => {
        const updatedChats = [...prevChats, newChat];
        localStorage.setItem('chats', JSON.stringify(updatedChats));
        return updatedChats;
      });
      
      return chatId;
    }
    
    return chatId;
  };

  const sendMessage = (chatId, userId, content) => {
    setChats(prevChats => {
      const updatedChats = prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, {
              id: Date.now(),
              userId,
              content,
              timestamp: new Date().toISOString()
            }]
          };
        }
        return chat;
      });
      
      localStorage.setItem('chats', JSON.stringify(updatedChats));
      return updatedChats;
    });
  };

  const getUserChats = (userId) => {
    return chats.filter(chat => 
      chat.buyerId === userId || chat.sellerId === userId
    );
  };

  const getChatById = (chatId) => {
    return chats.find(chat => chat.id === chatId);
  };

  return (
    <ChatContext.Provider value={{ createChat, sendMessage, getUserChats, getChatById }}>
      {children}
    </ChatContext.Provider>
  );
}; 