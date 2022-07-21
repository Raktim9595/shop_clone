const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  title: {
    type: "String",
    required: true
  },
  routeValue:{
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
