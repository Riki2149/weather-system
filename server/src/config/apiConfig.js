import axios from 'axios';

//Weather server call function
const apiConfig = async (place, date) => {
    try {
        const url = date ?
            `http://api.weatherapi.com/v1/history.json?key=${process.env.KEY}&q=${place}&dt=${date}&aqi=no` :
            `http://api.weatherapi.com/v1/forecast.json?key=${process.env.KEY}&q=${place}&days=1&aqi=no`;
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        return { error: `Failed to retrieve weather data: ${err.message}` }; // מחזיר את הודעת השגיאה
    }
};

export default apiConfig;
