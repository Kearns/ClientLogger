import io from "socket.io-client";

const ConsoleInterceptor = () => {
  const socket = io("http://localhost:80");
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
      __OG_CONSOLE__.warn.call(this, ...arguments);
    },
    log: function() {
    //   remoteLogger(arguments, "error");
      __OG_CONSOLE__.log.call(this, ...arguments);
    },
    error: function() {
      remoteLogger(arguments, "error");
      __OG_CONSOLE__.error.call(this, ...arguments);
    },
    info: __OG_CONSOLE__.info,
    dir: __OG_CONSOLE__.dir
  };
};

export default ConsoleInterceptor;
