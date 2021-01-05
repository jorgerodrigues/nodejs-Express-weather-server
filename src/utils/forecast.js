const request = require("postman-request");

const forecast = (lat, lon, callback) => {
  const API_KEY_WEATHER = "65ce5dd82e330776b4c03a1a452b25d8";
  const URL_WEATHER = "http://api.weatherstack.com/current?access_key=" + API_KEY_WEATHER + "&query=" + lon + "," + lat;
  console.log(URL_WEATHER);
  request(
    {
      url: URL_WEATHER,
      json: true,
    },
    (error, response) => {
      console.log(response.body);
      if (response.body.success === false) {
        callback("Unable to get the right location", undefined);
      } else if (response.body.current.length === 0) {
        callback("The location was not found", undefined);
      } else {
        callback(undefined, {
          Temperature: response.body.current.temperature,
          Precipitation: response.body.current.precip,
          Weather: response.body.current.weather_descriptions[0],
        });
      }
    }
  );
};

module.exports = forecast;
