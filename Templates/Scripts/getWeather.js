// const getCity = require('./getCity'); 在 Obsidian 中无效

async function getCity() {
    const url = "https://api.ip.sb/geoip";
    // const url = "https://bpi.ip.sb/geoip";
    const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": userAgent,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const city = data.city
        return city
    } catch (error) {
        console.error("Error fetching city data:", error);
        throw error; 
    }
}

async function getWeatherProto(city = 'beijing', format = "地点： %l \\n天气：%c %C 气温：%t 风力：%w  \\n月相：%m 日出时间：%S 日落时间：%s") {
    const url = "https://wttr.in/" + city + "?Tm2&lang=zh-cn&format=" + format;
    // const url = "https://wtr.in/" + city + "?Tm2&lang=zh-cn&format=" + format;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error; 
    }
}

// get weather by location 
async function getWeather() {
    try {
        const city = await getCity();
        const format = "%l+%c%t";
        const weather = await getWeatherProto(city, format);
        return weather;
    } catch (error) {
        return "None";
    }
}
// getWeather().then(value => {
//     console.log(value);
// });

module.exports = getWeather