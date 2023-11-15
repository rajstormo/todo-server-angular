const Todo = require('../models/todo');

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.json(todos);
  }
  catch(err) {
    console.log(err);
  }
}

const getTodo = async(req, res) => {
  try {
    const {id} = req.params;
    const todo = await Todo.findById({_id: id});
    if (!todo)
      return res.status(400).json({error: true, message: "No Task found with this ID"});

    return res.status(200).json({error: false, message: todo});
  }
  catch(err) {
    console.log(err);
  }
}

const createTodo = async(req, res) => {
  try {
    const {title, description} = req.body;
    if (!title || !description) 
      return res.status(400).json({error: true, message: "All fields are required"});

    const newTodoTask = new Todo({title: title, description: description});
    await newTodoTask.save();

    if (!newTodoTask)
      return res.status(500).json({error: true, message: "server error"});
    
    return res.status(201).json({error: false, message: newTodoTask});
  }
  catch(err) {
    console.log(err);
  }
}

const updateTodo = async(req, res) => {
  try {
    const {id} = req.params;
    const {title, description} = req.body;
    console.log(title, description)

    if (!id)
      return res.status(400).json({error: true, message: "No task found with this id"});

    const updatedTodo = await Todo.findByIdAndUpdate({_id: id}, {
      title: title,
      description: description
    });

    return res.status(200).json({error: false, message: updatedTodo})
  }
  catch(err) {
    console.log(err);
  }
}

const deleteTodo = async(req, res) => {
  try {
    const {id} = req.params;
    const result = await Todo.findByIdAndDelete({_id: id});

    if (!result)
      return res.status(500).json({error: true, message: "Something went wrong!"});
    
    return res.status(200).json({error: false, message: "Todo deleted"});
  }
  catch(err) {
    console.log(err);
  }
}


module.exports = {getTodos, getTodo, createTodo, updateTodo, deleteTodo};