const request = require('postman-request');

const forecast = (latitude, longtitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=c18b064815476cab03a7a723f9298892&query=' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longtitude);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to Weather service', undefined);
    } else if (body.error) {
      callback('Unable to find weather data', undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. Venku je aktuálně ${
          body.current.temperature
        } stupňů. A je
        ${body.current.precip * 100}% šance na déšť. Pocitová teplota je ${
          body.current.feelslike
        } stupňů.`
      );
    }
  });
};

module.exports = forecast;
