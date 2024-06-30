/** @format */

import React from "react";
import WeatherItem from "./WeatherItem";
class WeatherBox extends React.Component {
  render() {
    const styles = {
      display: "flex",
      flexDirection: "row",
      gap: "12px",
      justifyContent: "center",
      width: "100%",
      overflowX: "auto",
      overflowY: "hidden",
    };
    const data = this.props.data;
    // const location = this.props.location;
    return (
      <div style={styles}>
        {data.time.map((ele, ind) => (
          <WeatherItem
            high={data.temperature_2m_max[ind]}
            low={data.temperature_2m_min[ind]}
            day={new Date(ele).toDateString()}
            code={data.weather_code[ind]}
            isToday={ind === 0}
            key={ind}
          />
        ))}
      </div>
    );
  }
}
export default WeatherBox;
