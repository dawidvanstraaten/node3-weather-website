const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast.js");

app = express();

// Defines paths for Express config
const publicDirectoryPath = path.join(`${__dirname}/../public`);
const viewsPath = path.join(`${__dirname}/../templates/views`);
const partialsPath = path.join(`${__dirname}/../templates/partials`);

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Dawid van Straaten"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided"
    });
  } else {
    geocode(req.query.address, (err, { lat, long, location } = {}) => {
      if (err) {
        return res.send({ err });
      }
      forecast(lat, long, (err, forecastData) => {
        if (err) {
          return res.send({ err });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Dawid van Straaten"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is help text",
    name: "Dawid van Straaten"
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Dawid van Straaten",
    errorMessage: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Dawid van Straaten",
    errorMessage: "Page not found."
  });
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});