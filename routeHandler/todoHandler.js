const express = require("express");

const router = express.Router();

// get all the todos
router.get("/", async (req, res) => {});

// get a todo by id
router.get("/:id", async (req, res) => {});

// post  todo by id
router.post("/", async (req, res) => {});

// post multiple todo by id
router.post("/all", async (req, res) => {});

// put  todo by id
router.put("/:id", async (req, res) => {});


// delete todo by id
router.delete("/:id", async (req, res) => {});


module.exports = router;