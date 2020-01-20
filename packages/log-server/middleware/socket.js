const ioClient = require("socket.io");
const LogStream = require("../LogStream");
const db = require("./data");

const socket = server => ioClient(server).on("connection", onConnection);

const onConnection = socket => {
  const getLogs = async () => socket.emit("logs", await db.getLogs());
  const logStream = new LogStream({ socket, callback: db.pushLog });

  getLogs();
  setInterval(getLogs, 500);

  socket.on("console", async ({ type, message, date }) => {
    logStream.write({ type, message: JSON.stringify(message), date });
  });
};

module.exports = socket;
