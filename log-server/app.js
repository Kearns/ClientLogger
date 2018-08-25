const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const db = require("./DataDriver.js");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(80);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json(err);
});

io.on("connection", socket => {
  setInterval(async () => {
    const logs = await db.getLogs();
    console.log(logs);
    socket.emit("logs", logs);
  },5000);

  socket.on("console", async ({ type, message, date }) => {
    db.pushLog({ type, message: JSON.stringify(message), date });
  });
});
/** TODO: Setup socket for log streams */

module.exports = app;
