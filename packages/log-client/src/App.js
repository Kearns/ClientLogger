import React, { Component } from "react";
import "./App.css";
import io from "socket.io-client";
import push from "push-client";

const socket = io("http://localhost:80");

class App extends Component {
  state = { logs: [] };

  componentDidMount() {
    socket.on("logs", data => {
      this.setState({ logs: data });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Console Intercepts</h1>
        <hr />
        <h2>Logs</h2>
        <div className="LogDisplay">
          {this.state.logs.map(log => {
            const messages = JSON.parse(log.message);
            const messageKeys = Object.keys(messages);
            const mappedMessages = messageKeys.map(key =>
              typeof messages[key] === "string"
                ? messages[key]
                : JSON.stringify(messages[key])
            );
            return (
              <div className="log" key={`${log.type}__${log.date}__${log.id}`}>
                <div className={`log__head--${log.type}`}>
                  {log.type}{" "}
                  <span style={{ float: "right" }}>
                    <a>&#xd7;</a>
                  </span>
                </div>
                <div className="log__body">
                  <p>
                    <strong>Date:</strong> {log.date}
                  </p>
                  <p>
                    <strong>Message:</strong>
                  </p>
                  {mappedMessages.map(message => {
                    return (
                      <ul
                        className="log__data"
                        key={`${log.type}__${log.date}__${message}`}
                      >
                        <li>{message}</li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <hr />
        <h2>Demo</h2>
        <button
          onClick={() => {
            console.warn(
              { message: "Console.warn intercepted!" },
              { code: 111 }
            );
          }}
        >
          Console Interceptor
        </button>
        <button
          onClick={() => {
            console.log("PUSH", push)
            push({
              type: "TEST", 
              payload: { message: "client push library used!" }
            });
          }}
        >
          Client Push Library
        </button>
      </div>
    );
  }
}

export default App;
