const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const URL = "mongodb+srv://sraddha:sraddha1234@cluster0.lf2j2dm.mongodb.net/test";
const app = express();
const tourRouter = require("./routes/tourRouter")
mongoose.connect(URL, { useNewUrlParser: true }).then((_connection) => {
    console.log("connected to the database");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", tourRouter);
app.listen(3000, () => {
    console.log("listening at 3000");
});
