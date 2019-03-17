const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZHZhbnN0cmFhdGVuIiwiYSI6ImNqdDRnZzd4cTAyMzM0OXFnY2dueGp4a3YifQ.grsVNpDaNA9Kr4rWtO4Njg&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
