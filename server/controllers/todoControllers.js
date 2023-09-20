const Todo = require("../Modal/todoModel");
const Joi = require("joi");
const {
  schema: taskValidation,
} = require("../validationSchema/taskValidation");
const postTodo = async (req, res, next) => {
  console.log(req.body);
  // const validation = Joi.valid(req.body, taskValidation);
  const { task } = await req.body;
  let validationError;

  try {
    validationError = await taskValidation.validateAsync({ task });
    const newTask = new Todo({ task });
    await newTask.save();
    return res.status(200).json({ message: `Task ${task} added` });
  } catch (error) {
    // if (validationError.error) {
    //   console.log("Write task properly");
    // }
    console.error(error);
    return res.status(400).json({ message: "Task not added" });
  }
};

const deleteTodo = async (req, res, next) => {
  const { id: todo_id } = req.params;
  try {
    const task = await Todo.findById(todo_id);
    if (!task) {
      return res.status(404).json({ message: "task not found " });
    } else {
      await task.remove();
      return res.status(200).json({ message: "Task removed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error occured" });
  }
};

const getTodo = async (req, res, next) => {
  try {
    const todoList = await Todo.find();
    if (!todoList) {
      return res.status(404).json({ message: "tasks not found " });
    } else {
      return res.status(200).json({ message: "All tasks", tasks: todoList });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error occured ", error: error });
  }
};

const todoDone = async (req, res, next) => {
  const { id: todo_id } = req.params;
  try {
    const task = await Todo.findById(todo_id);
    if (!task) {
      return res.status(404).json({ message: "task not found " });
    } else {
      task.done = !task.done;
      await task.save();
      return res.status(200).json({ message: "Task status changed" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error occured ", error: error });
  }
};

const todoEdit = async (req, res, next) => {
  const { id: todo_id } = req.params;
  const { task } = req.body;
  try {
    const todo = await Todo.findById(todo_id);
    if (!todo) {
      return res.status(404).json({ message: "task not found " });
    } else {
      todo.task = task;
      await todo.save();
      return res.status(200).json({ message: "Task edited" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error occured ", error: error });
  }
};

exports.postTodo = postTodo;

exports.deleteTodo = deleteTodo;

exports.getTodo = getTodo;

exports.todoDone = todoDone;

exports.todoEdit = todoEdit;
