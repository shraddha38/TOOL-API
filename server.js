const express = require('express');
const mongoose = require('mongoose');

const URL = "mongodb+srv://sraddha:sraddha#123@cluster0.lf2j2dm.mongodb.net/?retryWrites=true&w=majority"
const app = express();

mongoose.connect(URL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }).then((connection) => {
    console.log("connected to the database");
    console.log("connection", connection.connections);
});

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log("listening at 3000");
});
