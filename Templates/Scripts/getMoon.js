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

async function getMoon() {

    try {
        const city = 'Guangzhou';
        const format = "%m";
        const moon = await getWeatherProto(city, format);
        return moon;
    } catch (error) {
        return "None";
    }

}
// getMoon().then(value => {
//     console.log(value);
// });

module.exports = getMoon