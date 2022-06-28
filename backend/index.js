'use strict'

const chalk = require('chalk');
const { mongoose } = require('mongoose');
const dbconfig = require("./config.json")

var app = require('./app');
var port = 3700;

const {MongoClient} = require('mongodb');
const uri = dbconfig.usersAccessDB.uri;


mongoose.connect(uri)
.then(() => {
    // successful connection
    console.log(chalk.blue("[server] Successful connection"))

    //Creación del servidor
    app.listen(port, () =>{
        console.log(chalk.blue('[server] Server is started on locashost:'+ port))
    } )

})
.catch(err => {console.log(err)})
