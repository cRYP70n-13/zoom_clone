const express = require('express');
const dotenv = require('dotenv');

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/', (req, res) => {
	res.render('room');
})

app.listen(5000, () => console.log(`this shit is up and running`))