const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//defining schema for mongodb database
const todoSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    todos:[{
        title:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        checked:{
            type:Boolean,
            required:true
        },
        todoId:{
            type:String,
            required:true
        }
    }],
   
  },
  { timestamps: true }
);

const User = mongoose.model("Todo", todoSchema);

module.exports = User;
