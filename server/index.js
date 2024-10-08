const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

let rooms = {};  // Store rooms and player connections

// Home route
app.get('/', (req, res) => {
  res.render('home');
});

// Route to create a new game
app.post('/game/new', (req, res) => {
  const roomId = uuidv4();
  rooms[roomId] = { players: [], creator: null };  // Initialize room data
  res.redirect(`/game/${roomId}`);
});

// Game route
app.get('/game/:roomId', (req, res) => {
  const { roomId } = req.params;
  res.render('game', { roomId });
});

// Socket.IO connection
io.on('connection', (socket) => {
  // Player joins a room
  socket.on('join_room', (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].players.push(socket.id);
      if (rooms[roomId].players.length === 1) {
        rooms[roomId].creator = socket.id;  // First player to join is the creator
      }
      socket.join(roomId);

      // Notify all players in the room about the updated player list
      io.to(roomId).emit('players_update', rooms[roomId].players);
    }
  });

  // Handle the start game event (only room creator can start)
  socket.on('start_game', (roomId) => {
    if (rooms[roomId] && rooms[roomId].creator === socket.id) {
      io.to(roomId).emit('game_started');  // Notify all players that the game is starting
    } else {
      socket.emit('error_message', 'Only the room creator can start the game.');
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
