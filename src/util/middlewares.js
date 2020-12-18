const jwt = require("jsonwebtoken");

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      nombre: user.nombre,
      usuario: user.usuario,
      tipoDeUsuario: user.tipoDeUsuario,
    },
    "kuepachat",
    {
      expiresIn: "1h",
    }
  );
};

const getAuth = async (req, res, next) => {
  try {
    const data = req.headers.authorization.split(" ");
    const Bearer = data[0];
    const token = data[1];
    if (!token) {
      throw new Error("Ingrese para acceder al contenido");
    }
    const { _id } = jwt.verify(token, "kuepachat");
    req.body.id = _id;
    next();
  } catch (error) {
    res.status(401).send({
      message: error.name,
    });
  }
};

module.exports = { getToken, getAuth };
