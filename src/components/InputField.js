/** @format */

import { Component } from "react";
import SuggestionList from "./SuggestionList";
import SuggestionItem from "./SuggestionItem";
class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  handleChange(e) {
    this.setState((pre) => ({ ...pre, value: e.target.value }));
  }

  convertToFlag(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  render() {
    const { type = "text", placeholder = "", name = "" } = this.props;
    const styles = {
      width: "25%",
      position: "relative",
    };
    // console.log(this.props.displaySuggestions);
    return (
      <div style={styles}>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={this.props.curValue}
          onChange={this.props.handleChange}
          style={{ position: "relative", width: "100%" }}
          className="query"
          autoComplete="off"
        />

        {this.props.isLoading && <p>Loading...</p>}
        {this.props.error && <p>{this.props.error}</p>}

        {this.props.suggestions && !this.props.loading && (
          <SuggestionList>
            {this.props.suggestions.map((ele) => (
              <SuggestionItem
                name={ele.name}
                countryName={ele.country}
                countryFlag={this.convertToFlag(ele.country_code)}
                latitude={ele.latitude}
                longitude={ele.longitude}
                key={ele.id}
                handleSelect={() => this.props.handleSelect(ele)}
              />
            ))}
          </SuggestionList>
        )}
      </div>
    );
  }
}

export default InputField;
