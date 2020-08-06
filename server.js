const express = require('express');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid')

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

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

app.listen(5000, () => console.log(`this shit is up and running`))