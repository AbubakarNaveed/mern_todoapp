const express = require("express");
const router = express.Router();

const {
  postTodo,
  deleteTodo,
  getTodo,
  todoDone,
  todoEdit,
} = require("../controllers/todoControllers");

router.post("/post", postTodo);

router.delete("/delete/:id", deleteTodo);

router.get("/get", getTodo);

router.put("/done/:id", todoDone);

router.put("/edit/:id", todoEdit);

module.exports = router;
