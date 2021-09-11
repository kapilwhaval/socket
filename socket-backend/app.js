const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const { initSocket } = require('./socket');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/socketdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Something went wrong while connecting DB'));

initSocket();

app.listen(8000, () => console.log('Server is listening on port', 8000));