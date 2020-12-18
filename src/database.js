const mongoose = require("mongoose");

const URI =
  "mongodb://127.0.0.1:27017/dbkuepa";

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database is connected");
});
connection.on("error", (err) => {
  console.log("Algo salió mal");
});
