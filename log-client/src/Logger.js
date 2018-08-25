import io from "socket.io-client";

const socket = io("http://localhost:80");

const Logger = () => {
  const __OG_CONSOLE__ = window.console;

  const remoteLogger = (args, type) =>
    socket.emit("console", {
      type,
      message: args,
      date: new Date(Date.now())
    });

  window.console = {
    warn: function() {
      remoteLogger(arguments, "warn");
      __OG_CONSOLE__.warn.call(this, "My Console!!!", ...arguments);
    },
    log: function() {
      // remoteLogger(arguments, "error");
      __OG_CONSOLE__.log.call(this, "My Console!!!", ...arguments);
    },
    error: function() {
      remoteLogger(arguments, "error");
      __OG_CONSOLE__.error.call(this, "My Console!!!", ...arguments);
    }
  };
};

export default Logger;
