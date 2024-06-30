/** @format */

import { Component } from "react";
import SuggestionItem from "./SuggestionItem";
class SuggestionList extends Component {
  render() {
    const styles = {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      backgroundColor: "#FFF",
      position: "absolute",
      maxHeight: "200px",

      padding: "10px",
      border: "1px solid lightgrey",
      overflow: "auto",
    };
    return (
      <div
        style={{
          position: "absolute",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          ...styles,
        }}
        className="suggestion--list"
      >
        <h3>SUGESSTIONS</h3>
        <ul>{this.props.children}</ul>
      </div>
    );
  }
}

export default SuggestionList;
