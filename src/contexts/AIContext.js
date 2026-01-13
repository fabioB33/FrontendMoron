import React, { createContext, useContext, useState } from 'react';

const AIContext = createContext(null);

export const AIProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random()}`);

  const openAI = () => setIsOpen(true);
  const closeAI = () => setIsOpen(false);
  const toggleAI = () => setIsOpen(!isOpen);

  return (
    <AIContext.Provider value={{ isOpen, openAI, closeAI, toggleAI, sessionId }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within AIProvider');
  }
  return context;
};