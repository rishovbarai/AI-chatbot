const { OpenAI } = require('openai');

// Initialize OpenAI API directly with the apiKey
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your API key from environment variable
});

const getGpt3Response = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'text-davinci-003', depending on your use case
      messages: [{ role: 'user', content: message }],
      max_tokens: 150,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    if (error.code === 'insufficient_quota') {
      console.error('Rate limit exceeded, please try again later.');
      return 'Sorry, I encountered a rate limit error.';
    } else {
      console.error('Error with GPT-3 API:', error);
      return 'Sorry, I encountered an error.';
    }
  }
};

module.exports = { getGpt3Response };
