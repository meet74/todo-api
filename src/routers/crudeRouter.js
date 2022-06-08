const express = require("express");
const Todos = require("../database/schema/todoSchema");
const { randomUUID } = require("crypto");
const router = express.Router();

router.post("/addTodo", async (req, res) => {
  try {
    const todoData = req.body;
    const todoId = randomUUID();
    
    const todo = new Todos({
      userId: todoData.userId,
      todos: [
        {
          title: todoData.title,
          date: todoData.date,
          checked: todoData.checked,
          todoId: todoId
        }
      ],
      
    });
    console.log(todo);
    await todo.save();

    res.status(200).json({
      message: "Success",
      todo: todo
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

module.exports = router;
