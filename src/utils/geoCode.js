const request = require("postman-request");

const API_KEY_GEO = "pk.eyJ1Ijoiam9yZ2Vsb3BlcyIsImEiOiJja2pnd21pamwwdno4MzFudjkwMmlvdjBuIn0.pSw4Ozqx7QtFj_mYlkHbPQ";

const geoCode = (address, callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + API_KEY_GEO;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      return callback("Unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      return callback("Unable to find location. Try another search term", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
