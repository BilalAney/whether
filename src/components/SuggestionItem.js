/** @format */

import { Component } from "react";
class SuggestionItem extends Component {
  render() {
    const styles = {
      display: "grid",
      gridTemplateColumns: "min-content 1fr",
      gap: "8px",
      textWrap: "nowrap",
      borderBottom: "1px solid grey",
    };

    return (
      <li style={styles} role="button" onClick={this.props.handleSelect} className="suggestion--item">
        <p>{this.props.countryFlag}</p>
        <div>
          <p>
            {this.props.countryName} / {this.props.name}
          </p>
          <p>
            {this.props.longitude} / {this.props.latitude}
          </p>
        </div>
      </li>
    );
  }
}

export default SuggestionItem;
