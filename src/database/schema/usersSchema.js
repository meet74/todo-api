const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defining schema for mongodb database
const userSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;