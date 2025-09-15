const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

 let users = {};

io.on('connection', (socket) => {
  console.log("User connected:", socket.id);


  socket.on('login', (username) => {
    users[username] = socket.id; 
    console.log("Users:", users);
  });

  // To specific person
  socket.on('private message', ({ to, msg }) => {
    const targetSocketId = users[to];
    if (targetSocketId) {
      io.to(targetSocketId).emit('private message', { from: socket.id, msg });
    }
  });

  
  socket.on('disconnect', () => {
    for (let username in users) {
      if (users[username] === socket.id) {
        delete users[username];
        break;
      }
    }
    console.log("Users after disconnect:", users);
  });
});

httpServer.listen(3000, () => {
    console.log(`Server is running on port 3000.........`);
});
