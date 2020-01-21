import io from "socket.io-client";

// TODO: client id solution temporary. All Client Ids, including anonymous ids, should be generated server side.
const defaultPayload = {
  clientId: `anonymous-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  browserDetails: {
    ...window.navigator
  }
};

const socket = io("http://localhost:80");
// TODO: Make arg includes more granular, as navigator and performace are quite large
const push = (
  type = "default",
  userPayload = {},
  args = {
    include: {
      navigator: false,
      performance: false
    }
  }
) => {
  let payload = defaultPayload;

  if (args.include.navigator) {
    payload.navigator = window.navigator;
  }

  if (args.include.performance) {
    payload.performance = window.performance;
  }

  payload = { userPayload, ...payload };

  socket.emit("push", {
    type,
    payload,
    date: new Date(Date.now())
  });
};

export default push;
