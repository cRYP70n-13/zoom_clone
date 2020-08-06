const express = require('express');
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Load env variables
dotenv.config({ path: './config/config.env' });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req, res) => {
	res.render('room', {
		roomId: req.params.room
	})
});

io.on('connection', socket => {
	socket.on('join-room', (roomId) => {
		socket.join(roomId);
		socket.to(roomId).broadcast.emit('user-connected');
	})
})

server.listen(5000, () => console.log(`this shit is up and running`))