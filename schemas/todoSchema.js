const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


// instance methods

todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },
};

todoSchema.methods = {
  findInActive : function(){
    return mongoose.model('Todo').find({status: "inactive"});
  }
}


// static methods
todoSchema.statics = {
  findByJS : function(){
    return this.find({title: /js/i});
  }
}

module.exports = todoSchema;
