import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { getChatResponse } from '../services/api';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async (message) => {
    const userMessage = { role: 'user', content: message };
    setMessages([...messages, userMessage]);
    setLoading(true);

    try {
      const response = await getChatResponse(message);
      const botMessage = { role: 'bot', content: response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'bot', content: 'Sorry, something went wrong.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col max-w-2xl mx-auto bg-gray-100 shadow-md rounded-lg overflow-hidden h-screen">
      <div className="flex-grow overflow-y-auto p-6">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {loading && <p className="text-sm text-gray-500">Typing...</p>}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
