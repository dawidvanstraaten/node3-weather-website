const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/c06585d2357f5a4e2fdaade9b40c79f8/${lat},${long}?units=si`;

  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.err) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degress out. There is a " +
          body.currently.precipProbability +
          "% chance of rain." +
          "The weather will have a minimum of " +
          body.daily.data[0].temperatureMin +
          "℃ and a maximum of " +
          body.daily.data[0].temperatureMax +
          "℃."
      );
    }
  });
};

module.exports = forecast;
