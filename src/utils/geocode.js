const request = require('postman-request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1Ijoicm9hbjIzIiwiYSI6ImNraGh5OGRpbDBtOXYyenA5em53ZGttMjQifQ.F4iTfCim0mISWX1Bd-x6ig&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to MapBox service', undefined);
    } else if (body.features.length === 0) {
      callback('Nezadal jsi nějakou blbost?', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place_name: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
