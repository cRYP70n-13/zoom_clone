const express = require('express');
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const { ExpressPeerServer } = require('peer');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Starting a peerjs server
const peerServer = ExpressPeerServer(server, {
	debug: true
});

// Load env variables
dotenv.config({ path: './config/config.env' });

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Use the peerserver
app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
	res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req, res) => {
	res.render('room', {
		roomId: req.params.room
	})
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    // messages
    socket.on("message", (message) => {
      //send message to the same room
      io.to(roomId).emit("createMessage", message);
    });

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

server.listen(5000, () => console.log(`this shit is up and running`))