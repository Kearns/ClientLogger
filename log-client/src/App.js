import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = { logs: [] };

  componentDidMount() {
    fetch("/logs")
      .then(res => res.json())
      .then(logs => this.setState({ logs }));
  }

  render() {
    console.log(this.state.logs);
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.logs.map(log => (
          <div key={`${log.message}--${log.date}`}>
            {log.type}
            <code>{JSON.stringify(log.message, 4)}</code>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
