/** @format */

import React from "react";
class WeatherItem extends React.Component {
  render() {
    const styles = {
      backgroundColor:
        this.props.high > 30
          ? "#4d0000"
          : this.props.high < 10
          ? "#000033"
          : "#595959",
      display: "flex",
      flexDirection: "column",
    };
    function convertToDay(date) {
      const stringDate = Date(date).toString();
      const split = date.split(" ");
      const theDay = split.at(0);
      return theDay;
    }
    function getWeatherIcon(wmoCode) {
      const icons = new Map([
        [[0], "☀️"],
        [[1], "🌤"],
        [[2], "⛅️"],
        [[3], "☁️"],
        [[45, 48], "🌫"],
        [[51, 56, 61, 66, 80], "🌦"],
        [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
        [[71, 73, 75, 77, 85, 86], "🌨"],
        [[95], "🌩"],
        [[96, 99], "⛈"],
      ]);
      const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
      if (!arr) return "NOT FOUND";
      return icons.get(arr);
    }
    return (
      <div className="weather--item" style={styles}>
        <span>{getWeatherIcon(this.props.code)}</span>
        <p>
          {this.props.high}&deg; / {this.props.low}&deg;
        </p>
        <p>{this.props.isToday ? "Today" : convertToDay(this.props.day)}</p>
      </div>
    );
  }
}

export default WeatherItem;
