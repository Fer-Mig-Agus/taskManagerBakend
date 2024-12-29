const mongoose = require('mongoose');
require("dotenv").config();

const { URL_BDD } = process.env;

mongoose.connect(URL_BDD);

const db=mongoose.connection;
db.on('error',console.error.bind(console,'Error al conectar con la BDD MongoDB'))
db.on('open',function callback(){
    console.log('Conectado a MongoDB')
})


module.exports=db;

