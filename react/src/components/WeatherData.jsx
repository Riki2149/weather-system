import '../style/WeatherData.css';

const WeatherData = ({ weatherData }) => {
    return (
        <div className="weather-data-container">
            <h1 className="city">{weatherData.location.city}</h1>
            <p className="country">{weatherData.location.country}</p>
            <p className="time">
                {weatherData.location.localtime.split(" ")[0]} at {weatherData.location.localtime.split(" ")[1]}
            </p>
            <h1 className="current-temp">{weatherData.current.temp}°</h1>
            <h2 className="condition-text">{weatherData.current.condition}</h2>
            <div className="details">
                <div className="data-item">
                    <p className="label">Precipitation</p>
                    <p className="data">{weatherData.current.precipitation} mm</p>
                </div>
                <div className="data-item">
                    <p className="label">Humidity</p>
                    <p className="data">{weatherData.current.humidity}%</p>
                </div>
                <div className="data-item">
                    <p className="label">Wind</p>
                    <p className="data">{weatherData.current.wind} km/h</p>
                </div>
            </div>
            <div className="hours">
                {weatherData.hourlyData.map(hour => (
                    <div key={hour.hour} className="data-hour">
                        <p className="hour">{hour.hour}</p>
                        <p className="temp-c">{hour.temp}°</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherData;
