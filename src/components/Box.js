/** @format */

import React from "react";
class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = {
      border: "1px double black",
      width: "80%",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      alignItems: "center",
      justifyContent: "center",
      padding: "25px",
    };

    return (
      <div className="Box" style={styles}>
        <Title title="🌩️BILAL'S WEATHER☀️" />
        {this.props.children}
      </div>
    );
  }
}

class Title extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}

export default Box;
