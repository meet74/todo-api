const mongoose = require('mongoose');



//connecting with mongodb database using mongoose
module.exports = database = () => {
    mongoose.connect('mongodb+srv://meetsn:meetsn@temp.fdu0w.mongodb.net/?retryWrites=true&w=majority').then(() => {
        console.log("Database Connected");
    }).catch(error => {
        console.log(error);
    })
}