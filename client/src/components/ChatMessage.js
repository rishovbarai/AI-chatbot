import React from 'react';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`my-2 p-3 max-w-xs rounded-lg ${isUser ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-300 text-black mr-auto'}`}>
      <p>{message.content}</p>
    </div>
  );
};

export default ChatMessage;
