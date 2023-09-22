const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

const todoHandler = require('./routeHandler/todoHandler')

// middleware
app.use(express.json());

// database connection with mongoose
mongoose
  .connect("mongodb://localhost/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

// application routers
app.use('/todo', todoHandler)


// default error handler
function errorHandler(err, req, res, next) {
  if (req.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

// listen port
app.listen(port, () => {
  console.log(`app listening at port on ${port}`);
});
