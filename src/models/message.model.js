const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    usuario: {
      type: String,
      required: true,
    },
    moderador: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = new model("Message", messageSchema);
module.exports = Message;
