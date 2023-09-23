const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// get active the todos
router.get("/active", async (req, res) => {
   try{
      const todo = new Todo();
      const data = await todo.findActive();
      res.status(200).json({
        data,
      })
   }
   catch(err){
    console.error(err)
    res.status(500).json({
        error: "there was a server side error"
    })
   }
});

// js 
router.get("/js", async (req, res) => {
   try{
    const data = await Todo.findByJS();
    res.status(200).json({
      data,
    })
   }
   catch(err){
    console.error(err)
    res.status(500).json({
        error: "there was a server side error"
    })
   }
});


// get in active the todos
router.get("/inactive", async (req, res) => {
   try{
      const todo = new Todo();
      const data = await todo.findInActive();
      res.status(200).json({
        data,
      })
   }
   catch(err){
    console.error(err)
    res.status(500).json({
        error: "there was a server side error"
    })
   }
});


// get all the todos
router.get("/", async (req, res) => {
    try{
     const result =   await Todo.find({status: 'inactive'}).select({
        _id: 0,
        _v: 0,
        date: 0
     }).limit(2)
        res.status(200).json({
            result : result,
            message: 'There todo get active'
        })
    }
    catch(err){
        console.error(err)
        res.status(500).json({
            error: "there was a server side error"
        })
    }
});

// get a  todo by id
router.get("/:id", async (req, res) => {
    try{
        const result =   await Todo.find({_id: req.params.id})
           res.status(200).json({
               result : result,
               message: 'There todo get active'
           })
       }
       catch(err){
           console.error(err)
           res.status(500).json({
               error: "there was a server side error"
           })
       }
});

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
   const result =  await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      },
      {
        new: true,
        useFindAndModify: false
      }
    );
    res.status(200).json({
      message: "Todo was and update",
    });
    
console.log(result)
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was server side error",
    });
  }
  
});

// delete  todo
router.delete("/:id", async (req, res) => {
    try{
        const result =   await Todo.deleteOne({_id: req.params.id})
           res.status(200).json({
               result : result,
               message: 'Todo Was deleted'
           })
       }
       catch(err){
           console.error(err)
           res.status(500).json({
               error: "there was a server side error"
           })
       }
});

module.exports = router;
