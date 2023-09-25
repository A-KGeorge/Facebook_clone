const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.models.Code || mongoose.model("Code", codeSchema);
