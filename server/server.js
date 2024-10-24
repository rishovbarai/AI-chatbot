const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();
const server = http.createServer(app);
const io = socketIO(server);

const openAiService = require('./services/openAiService');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Middleware and routes
app.use(express.json());
app.use(cors());
app.use('/api', require('./routes/chatRoute'));

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('send_message', async (msgData) => {
    const response = await openAiService.getGpt3Response(msgData.message);
    socket.emit('receive_message', { response });
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
