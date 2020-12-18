const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    usuario: {
      type: String,
      required: true,
      unique: true,
    },
    contrasenia: {
      type: String,
      required: true,
    },
    tipoDeUsuario: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
