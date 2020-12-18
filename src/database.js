const mongoose = require("mongoose");

const URI =
  "mongodb+srv://dbAdmin:REAJA95fxd8UueiO@cluster0.eb3o4.mongodb.net/kuepachat?retryWrites=true&w=majority";

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
