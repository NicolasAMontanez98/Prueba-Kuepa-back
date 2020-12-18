const userCtrl = {};

const User = require("../models/user.model");
const { getToken, isAuth } = require("../util/middlewares");
const bcrypt = require("bcrypt");

userCtrl.register = async (req, res) => {
  try {
    console.log(req.body);
    const { contrasenia } = req.body;
    const encryptedPass = await bcrypt.hash(contrasenia, 7);
    const user = new User({
      nombre: req.body.nombre,
      usuario: req.body.usuario,
      tipoDeUsuario: req.body.tipoDeUsuario,
      contrasenia: encryptedPass,
    });
    const newUser = await user.save();
    if (newUser) {
      res.status(200).send({
        message: "Registro exitoso",
        status: 200,
        nombre: newUser.nombre,
        usuario: newUser.usuario,
        tipoDeUsuario: newUser.tipoDeUsuario,
        contrasenia: newUser.contrasenia,
        token: getToken(newUser),
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

userCtrl.login = async (req, res) => {
  try {
    const { usuario, contrasenia } = req.body;
    const user = await User.findOne({ usuario });
    if (!user) {
      throw new Error("El usuario no existe");
    }
    const isValid = bcrypt.compare(contrasenia, user.contrasenia);
    if (!isValid) {
      throw new Error("Contraseña incorrecta");
    }
    res.status(200).send({
      message: "Ingreso exitoso",
      status: 200,
      token: getToken(user),
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error,
    });
  }
};

userCtrl.getInfo = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("El usuario no existe");
    }
    res.status(200).send({
      message: `Bienvenido ${user.nombre}`,
      status: 200,
      nombre: user.nombre,
      usuario: user.usuario,
      tipoDeUsuario: user.tipoDeUsuario,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
      status: 400,
    });
  }
};

module.exports = userCtrl;
