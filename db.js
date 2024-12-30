const mongoose = require('mongoose');
require("dotenv").config();

const { URL_BDD } = process.env;

mongoose.connect(URL_BDD);

const db=mongoose.connection;
db.on('error',console.error.bind(console,'Error connecting to the MongoDB database.'))
db.on('open',function callback(){
    console.log('Connected to MongoDB')
})


module.exports=db;

