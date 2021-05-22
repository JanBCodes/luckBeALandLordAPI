const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config({ path: `config/Keys.env`});
const cors = require('cors');
const fileUpload = require('express-fileupload');

var path = require('path');

const itemsController = require("./controller/itemsController.js")


/* if(process.env.NODE_ENV!=`production`)
{
    require('dotenv').config({ path: `config/Keys.env`});

} */

const app = express();

app.use(express.json());

app.use(cors({
    origin: `${process.env.FE_CORS_ORIGIN}`
}));

// app.use(express.static('assets/img/itemUploads'))

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use(fileUpload());

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