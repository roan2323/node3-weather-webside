const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // nastavuje cestu k sablonam
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and templates location
app.set('view engine', 'hbs'); // nastavuje ze se maji pouzivat handlebars
app.set('views', viewsPath); // rika, kde se nachazi sablony
hbs.registerPartials(partialsPath); // rika, kde se nachazeji partials

// setup the static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Roman Vanek',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page Woe',
    name: 'Fritz Opitz',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'Ty woe bro, s čím chceš píchnout?',
    name: 'Krtek Čtvrtek',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Zadal jsi vůbec něco?',
    });
  }

  address = req.query.address;

  geocode(address, (error, { latitude, longitude, place_name } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    } else {
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        } else {
          res.send({
            forecast: forecastData,
            location: place_name,
            address: address,
          });
        }
      });
    }
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found',
    name: 'Prdelín',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
    name: 'Hovňousek',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
