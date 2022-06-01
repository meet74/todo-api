const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const port = 5000;

//Middleware
app.use(bodyParser.json());


//Mongo Uri
const mongoUri = 'mongodb://localhost:27017';

// database connection
mongoose.connect(mongoUri).then(()=>{
    console.log('Connected to Database');
}).catch(err => {
    console.log(err);
})

// @route GET /
app.get('/',(req,res) => {
    res.send('Todo app')
})

app.listen(port,()=>console.log(`Server started on ${port}`));