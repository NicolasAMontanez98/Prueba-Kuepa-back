require("dotenv").config();
const http = require("http");
const app = require("./app");
require("./database");
const Message = require("./models/message.model");

const servidor = http.createServer(app);

const options = {
  cors: true,
  origins: ["http://localhost:3000"],
};

const io = require("socket.io")(servidor, options);

io.of("clase").on("connection", async (socket) => {
  try {
    const messages = await Message.find();
    socket.emit("messages saves", messages);
    socket.on("send message", async (msg) => {
      const newMessage = await Message.create(msg);
      io.of("clase").emit("new messages", newMessage);
    });
  } catch (error) {
    console.log(error);
  }
});

const port = app.get("port");

servidor.listen(8000, () => {
  console.log(`Servidor inicializado en ${port}`);
});
