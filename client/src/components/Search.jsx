import { useState } from "react";
import axios from "axios";
import WeatherData from "./WeatherData";
import "../style/Search.css";


const Search = () => {
    let [cityName, setCityName] = useState("");
    let [weatherData, setWeatherData] = useState(null);
    let [error, setError] = useState(null);

    //Hardened city value retention function
    const changeValue = (e) => {
        setCityName(e.target.value);
    };

    //Weather data retrieval function by city
    const checkWeather = async () => {
        if (cityName) {
            try {
                const response = await axios.get(`http://localhost:8080/api/weather/${cityName}`);
                setWeatherData(response.data);
                setError(null);
            } catch (err) {
                setWeatherData(null);
                setError(" City not found. Data cannot be retrieved");
            }
        }
    };

    // Data retrieval function by pressing enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            checkWeather();
        }
    };

    return (
        <div className="search-container">
            <img src="../public/images/לוגו.png" alt="" />
            <div className="search-display">
                <h2 className="search-title">
                    Use our weather app <br /> to see the weather <br /> around the world
                </h2>
                <label htmlFor="city" className="search-label">City name</label>
                <div className="input-group">
                    <input
                        type="text"
                        id="city"
                        className="search-input"
                        onChange={changeValue}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="search-button" onClick={checkWeather}>Check</button>
                </div>
            </div>
            {/* Data display component */}
            <div className="weather-display">
                {weatherData ?
                    <WeatherData weatherData={weatherData} />
                    :
                    <div className="empty-card">{error ? error : "No data was collected"}</div>
                }
            </div>

            <footer className="footer">
                {weatherData && (
                    <>
                        <p>latitude: {weatherData.location.lat.toFixed(2)}      longitude: {weatherData.location.lon.toFixed(2)}</p>
                        <p>Accurate to {weatherData.location.localtime.split(" ")[0]} at {weatherData.location.localtime.split(" ")[1]}</p>
                    </>
                )}
            </footer>
        </div>
    );
};

export default Search;
