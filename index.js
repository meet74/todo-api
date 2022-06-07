const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./src/routers/authRouter')
const mongoDatabase = require('./src/database/db_url')
const app = express();
const server = require('http').createServer(app);
const port = 5000;
const cors=require("cors");


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


//Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions)) ;


//database connection
mongoDatabase();


//mongoose and mongo sandbox routes
app.use('/auth', authRouter);


// @route GET /
app.get('/',(req,res) => {
    res.send('Todo app')
})

server.listen(port,()=>console.log(`Server started on ${port}`));