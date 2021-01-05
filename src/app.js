const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;

console.log(process.env.PORT);

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebards engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// This directs express to provide from the folder
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Jorge",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Jorge",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Do you need help?",
    name: "Jorge",
    helpMessage: "This is your help message. Are you satisfied?",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Jorge",
    message: "Maybe some of the help below will be interesting for you?",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Jorge",
    message: "This page could not be found",
  });
});

app.listen(PORT, () => {
  console.log("Sever is up on port " + PORT);
});
