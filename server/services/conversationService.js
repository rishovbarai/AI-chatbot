const Conversation = require('../models/conversationModel');

const saveMessage = async (userId, sender, message) => {
  try {
    let conversation = await Conversation.findOne({ userId });
    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }
    conversation.messages.push({ sender, text: message });
    await conversation.save();
  } catch (error) {
    console.error('Error saving conversation:', error);
  }
};

const getConversationHistory = async (userId) => {
  try {
    const conversation = await Conversation.findOne({ userId });
    return conversation ? conversation.messages : [];
  } catch (error) {
    console.error('Error fetching conversation history:', error);
    return [];
  }
};

module.exports = { saveMessage, getConversationHistory };
