const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/route.js');
require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};

mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`, options).then(() => {
    console.log('Connection with Database has been established successfully')
});

app.get("/", (req, res) => {
    res.json({
        message: "S Ahmed Naim"
    });
});

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`)
});
