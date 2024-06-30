/** @format */
import React from "react";
import "./App.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement() {
    this.setState((curState) => ({ ...curState, count: curState.count + 1 }));
  }

  handleDecrement() {
    this.setState((curState) => ({ ...curState, count: curState.count - 1 }));
  }

  render() {
    const date = new Date("june 1 2024");
    date.setDate(date.getDate() + this.state.count);
    return (
      <div className="App">
        <div className="box">
          <button onClick={this.handleIncrement}>+</button>
          <span>{this.state.count}</span>
          <button onClick={this.handleDecrement}>-</button>
        </div>
        <p>
          The date: {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
        </p>
      </div>
    );
  }
}

export default Counter;
