const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

//Settings
app.set("port", 8000);

//Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//routes
app.use("/api/user", require("./routes/user"));

module.exports = app;
