const mongoose = require('mongoose');

const db_url = "mongodb+srv://meets:meets7474@cluster0.udonv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//connecting with mongodb database using mongoose
module.exports = database = () => {
    mongoose.connect('mongodb+srv://meets74:meets74@todos.b1mun.mongodb.net/?retryWrites=true&w=majority').then(() => {
        console.log("Database Connected");
    }).catch(error => {
        console.log(error);
    })
}