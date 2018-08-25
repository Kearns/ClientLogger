import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import ConsoleInterceptor from "console-interceptor";

ConsoleInterceptor();

ReactDOM.render(<App />, document.getElementById("root"));

registerServiceWorker();
