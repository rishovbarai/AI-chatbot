const express = require('express');
const router = express.Router();
const conversationService = require('../services/conversationService');
const { getGpt3Response } = require('../services/openAiService');


router.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
      const reply = await getGpt3Response(message);
      res.status(200).json({ reply });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
// Endpoint for fetching conversation history
router.get('/history/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const history = await conversationService.getConversationHistory(userId);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversation history' });
  }
});

module.exports = router;
