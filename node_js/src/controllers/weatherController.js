import apiConfig from "../config/apiConfig.js";

//Customized weather data return function
const getWeatherData = async (req, res) => {
    const { place } = req.params;
    let result = {};
    let hoursData = [];
    let cityHour;
    //Retrieving current day data
    try {
        let dataToday = await apiConfig(place);
        let forecastHours = dataToday.forecast?.forecastday[0]?.hour || [];
        cityHour = new Date(dataToday.location.localtime).getHours();
        for (let i = cityHour - 3; i <= cityHour + 1; i++) {
            let hourData = forecastHours.find(h => h.time.split(" ")[1].startsWith(i.toString().padStart(2, '0')));
            if (hourData) {
                hoursData.push({ hour: hourData.time.split(" ")[1], temp: hourData.temp_c });
            }
        }

        result = {
            location: {
                city: dataToday.location.name,
                country: dataToday.location.country,
                localtime: dataToday.location.localtime,
                lat: dataToday.location.lat,
                lon: dataToday.location.lon,
            },
            current: {
                temp: dataToday.current.temp_c,
                condition: dataToday.current.condition.text,
                precipitation: dataToday.current.precip_mm,
                humidity: dataToday.current.humidity,
                wind: dataToday.current.wind_kph
            }
        };
    } catch (err) {
        return res.status(500).json({
            title: "Error",
            message: `Failed to retrieve weather data for ${place}: ${err.message}`
        });
    }
    //Retrieving yesterday's data in case it is needed
    if (cityHour - 3 < 0) {
        try {
            let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
            let formattedDate = yesterday.toISOString().split('T')[0];
            let dataYesterday = await apiConfig(place, formattedDate);
            if (dataYesterday.forecast) {
                let forecastYesterday = dataYesterday.forecast.forecastday[0]?.hour || [];
                for (let i = 23; i > 20 && hoursData.length < 5; i--) {
                    let hourData = forecastYesterday.find(h => h.time.split(" ")[1].startsWith(i.toString().padStart(2, '0')));
                    if (hourData) {
                        hoursData.unshift({ hour: hourData.time.split(" ")[1], temp: hourData.temp_c });
                    }
                }
            }
        } catch (err) {
            return res.status(500).json({
                title: "Error",
                message: `Failed to retrieve weather data for yesterday in ${place}: ${err.message}`
            });
        }
    }

    ////Retrieving tomorrow's data in case it is needed
    if (cityHour + 1 >= 24) {
        try {
            let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
            let formattedDate = tomorrow.toISOString().split('T')[0];

            let dataTomorrow = await apiConfig(place, formattedDate);
            if (dataTomorrow.forecast) {
                let forecastTomorrow = dataTomorrow.forecast.forecastday[0]?.hour || [];
                let hourData = forecastTomorrow.find(h => h.time.split(" ")[1].startsWith("00"));
                if (hourData) {
                    hoursData.push({ hour: hourData.time.split(" ")[1], temp: hourData.temp_c });
                }
            }
        } catch (err) {
            return res.status(500).json({
                title: "Error",
                message: `Failed to retrieve tomorrow's weather data for ${place}: ${err.message}`
            });
        }
    }

    result = { ...result, hourlyData: hoursData };
    res.json(result);
};

export default getWeatherData;
