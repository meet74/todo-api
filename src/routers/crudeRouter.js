const express = require("express");
const Todos = require("../database/schema/todoSchema");
const { randomUUID } = require("crypto");
const router = express.Router();

router.get('/gettodos',(req,res) => {
  console.log(req.query.userid);
  const userId = req.query.userid;
  Todos.find({ userId: userId }).then(async doc => {
    console.log(doc);
    if (doc.length>0) {
      res.status(200).json({
        message: "Success",
        todo: doc
      });
    }else{
      res.status(404).json({
        message: "Not found",
      });
    }
  })
})


router.post("/addTodo", async (req, res) => {
  try {
    const todoData = req.body;
    const todoId = randomUUID();
    const userID = todoData.userId;
    Todos.findOne({ userId: userID }).then(async doc => {
      if (doc === null) {
        const todo = new Todos({
          userId: todoData.userId,
          todos: [
            {
              title: todoData.title,
              date: todoData.date,
              checked: todoData.checked,
              todoId: todoId
            }
          ]
        });
        console.log(todo);
        await todo.save();

        res.status(200).json({
          message: "Success",
          todo: todo
        });
      } else {
        Todos.findOne({ userId: userID }).then(result => {
          console.log("update", result.todos);
          result.todos.push({
            title: todoData.title,
            date: todoData.date,
            checked: todoData.checked,
            todoId: todoId
          });
          result.save();
          res.status(200).json({
            message: "Success",
            todo: result
          });
          console.log("new", res.todos);
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

 router.put("/updatetodo", (req, res) => {
   const todoData = req.body;
   console.log('todos1',todoData);
   const userID = todoData.userId;
    console.log(userID);
   Todos.findOne({userId: userID}).then((doc) => {
    console.log(doc);
    if (doc) {
      const todos = doc.todos;
      const index = todos.findIndex((todo)=>todo.todoId === todoData.todoId)
      todos[index] = todoData;
      doc.save();
      res.status(200).json({
        message: "Success",
        todo: todos[index]
      });
    }else{
      res.status(404).json({
        message: "Not found",
      });
    }
   })
 });

 router.delete("/deletetodo", (req, res) => {
  const userID = req.query.userid;
  const todoId = req.query.todoId;
   console.log(userID);
  Todos.findOne({userId: userID}).then((doc) => {
   console.log('delet',doc);
   if (doc) {
     const todos = doc.todos;
     const updatedTodos = todos.filter((todo)=>todo.todoId !== todoId)
     doc.todos=updatedTodos;
     console.log(updatedTodos);
     doc.save();
     res.status(200).json({
       message: "Successfully deleted",
       todo: updatedTodos
     });
   }else{
     res.status(404).json({
       message: "Not found",
     });
   }
  })
 });

 router.patch('/updatecheckbox',(req,res) => {
  const userID = req.query.userid;
  const todoId = req.query.todoId;
  const checked = req.query.checked;
   console.log(userID);
  Todos.findOne({userId: userID}).then((doc) => {
   console.log(doc);
   if (doc) {
     const todos = doc.todos;
     const index = doc.todos.findIndex((todo)=>todo.todoId === todoId)
     console.log('t',doc.todos+todoId);
     doc.todos[index].checked = checked;
      doc.save();
     res.status(200).json({
       message: "Success",
       todo: todos[index]
     });  
   }else{
     res.status(404).json({
       message: "Not found",
     });
   }
  })
 })

module.exports = router;
