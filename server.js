const express = require("express");
require('dotenv').config({ path: `config/Keys.env`});
const mongoose = require('mongoose');
var cors = require('cors');

const itemsController = require("./controller/itemsController.js");

const app = express();
app.use(express.json());

app.use(cors({
        origin: `${process.env.CORS_ORIGIN}`
    }))

app.use("/items", itemsController);


const PORT = process.env.PORT
app.listen(PORT,() => {

    console.log(`WebServer Running on ${PORT}`)
    
    mongoose.connect(`${process.env.MONGODB_CONN_STRING}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {

        console.log(`MongoDb Connected`)

    })
    .catch(err => {
        console.log(`Error occurred : $${err}`)
    }) 
});
