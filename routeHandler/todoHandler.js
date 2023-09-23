const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// get all the todos
router.get("/", async (req, res) => {});

// get a  todo by id
router.get("/:id", async (req, res) => {});

// // post a  todo
// router.post("/", async (req, res) => {
//     const newTodo = new Todo(req.body);
//     await newTodo.save();
// });

router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json({
      Message: "Todo was inserted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// get multiple todo
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({
      Message: "Todo was inserted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// put  todo
router.put("/:id", async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      }
    );
    res.status(200).json({
      message: "Todo was and update",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was server side error",
    });
  }
});

// delete  todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
