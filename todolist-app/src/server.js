const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/todolist-app', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected !
    console.log("Connected to MongoDB");
});

const app = express();
app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});