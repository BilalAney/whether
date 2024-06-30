/** @format */
import React from "react";
import "./App.css";
import Box from "./components/Box";
import WeatherBox from "./components/WeatherBox";
import InputField from "./components/InputField";
import Footer from "./components/Footer";
import CountryTitle from "./components/CountryTitle";

class App extends React.Component {
  state = {
    location: "",
    possibleData: null,
    error: null,
    weatherData: null,
    isLoadingSUG: false,
    isLoadingWEA: false,
  };

  constructor(props) {
    super(props);
    //We use (this) to refer to the current instance of the class (Or of the component)
    this.timeout = null;
  }

  globallistener = (e) => {
    // console.log(e.key !== "Escape");
    if (e.code.toLowerCase() !== "escape")
      document.querySelector(".query").focus();
  };

  componentDidMount() {
    document.addEventListener("keydown", this.globalListener);
    const locationData = JSON.parse(localStorage.getItem("locationData"));

    if (locationData) {
      this.fetchWeatherData(locationData.at(0));
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.globalListener);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.location !== this.state.location) {
      if (this.state.location.length < 2) {
        this.setState({ possibleData: null, error: null });
        return;
      }

      if (!this.timeout) {
        this.setState({ isLoadingSUG: true });
        this.timeout = setTimeout(() => {
          this.fetchPossibleData();
        }, 800);
      }
    }

    // if (prevState.weatherData !== this.state.weatherData) {
    //   localStorage.setItem("locationData", this.state.location);
    // }
  }

  fetchPossibleData = async () => {
    this.setState({ weatherData: null, error: null, possibleData: null });
    try {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      if (!this.state.location) return;
      const geocode = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}&count=10&language=en&format=json`
      );
      //console.log("The new fetch => ", geocode);
      const data = await geocode.json();

      if (!geocode.ok) throw new Error("Unable to find the location");
      if (!data.results) throw new Error("Location not found");
      // console.log("Data is here", data);
      this.setState({ possibleData: data.results });
    } catch (error) {
      console.error("ERROR OCCURED error: ", error.message);
      this.setState({ error: error.message });
    } finally {
      this.setState((pre) => ({ ...pre, isLoadingSUG: false }));
    }
  };

  fetchWeatherData = async (selectedLocation) => {
    this.setState({ isLoadingWEA: true, possibleData: null });
    // console.log("=> => => =>", selectedLocation);
    localStorage.setItem(
      "locationData",
      JSON.stringify([selectedLocation, selectedLocation.name])
    );
    try {
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.latitude}&longitude=${selectedLocation.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,snowfall_sum&timezone=${selectedLocation.timezone}`
      );
      if (!weatherRes.ok)
        throw new Error("Error when trying to fetch the weather data");
      const weatherData = await weatherRes.json();
      console.log(weatherData);
      this.setState({ weatherData: weatherData.daily });
    } catch (error) {
      console.error(error.message);
    } finally {
      this.setState((pre) => ({ ...pre, isLoadingWEA: false }));
      // this.setState({ location: "" });
    }
  };

  render() {
    // console.log("Weather data", this.state.weatherData);
    const savedLocation = JSON.parse(localStorage.getItem("locationData")).at(
      1
    );
    return (
      <div className="App">
        <Box>
          <InputField
            name="location"
            placeholder="Enter the location"
            updateLocation={(value) =>
              this.setState((pre) => ({ ...pre, location: value }))
            }
            curValue={this.state.location}
            handleChange={(e) => {
              this.setState({ location: e.target.value });
            }}
            isLoading={this.state.isLoadingSUG}
            suggestions={this.state.possibleData}
            error={this.state.error}
            handleSelect={this.fetchWeatherData}
          />
          <CountryTitle country={savedLocation} />
          {this.state.isLoadingWEA && <p>Loading...</p>}
          {this.state.weatherData && (
            <WeatherBox data={this.state.weatherData} />
          )}
        </Box>
        <Footer />
      </div>
    );
  }
}

export default App;
