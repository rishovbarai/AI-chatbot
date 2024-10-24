import axios from 'axios';

export const getChatResponse = async (message) => {
  try {
    const response = await axios.post('http://localhost:5000/api/chat', { message });
    return response.data.reply;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
