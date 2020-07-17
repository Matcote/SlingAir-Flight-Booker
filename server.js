"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { flights } = require("./test-data/flightSeating");
const { reservations } = require("./test-data/reservations");
const request = require("request-promise");

const handleFlight = (req, res) => {
  const { flightNumber } = req.params;
  const options = {
    uri: `https://journeyedu.herokuapp.com/slingair/flights/${flightNumber}`,
    headers: {
      "User-Agent": "Request-Promise",
    },
    json: true, // Automatically parses the JSON string in the response
  };
  request(options)
    .then((response) => res.status(200).send(response[flightNumber]))
    .catch((err) => {
      return err.error ? JSON.parse(err.error) : err;
    });
};
const handleUser = (req, res) => {
  let newReservation = req.body;
  const options = {
    method: "POST",
    uri: "https://journeyedu.herokuapp.com/slingair/users",
    body: newReservation,
    json: true, // Automatically parses the JSON string in the response
  };
  request(options)
    .then((response) => res.status(201).json(response.reservation))
    .catch((err) => {
      return err.error ? JSON.parse(err.error) : err;
    });
};
const handleConfirmation = (req, res) => {
  const options = {
    uri: `https://journeyedu.herokuapp.com/slingair/users/${req.params.userId}`,
    headers: {
      "User-Agent": "Request-Promise",
    },
    json: true, // Automatically parses the JSON string in the response
  };
  request(options)
    .then((response) => res.status(200).json(response.data))
    .catch((err) => {
      return err.error ? JSON.parse(err.error) : err;
    });
};
const handleFlightList = (req, res) => {
  const options = {
    uri: "https://journeyedu.herokuapp.com/slingair/flights",
    headers: {
      "User-Agent": "Request-Promise",
    },
    json: true, // Automatically parses the JSON string in the response
  };
  request(options)
    .then((response) => res.status(200).json(response.flights))
    .catch((err) => {
      return err.error ? JSON.parse(err.error) : err;
    });
};

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get("/flights", handleFlightList)
  .get("/flights/:flightNumber", handleFlight)
  .post("/users", handleUser)
  .get("/confirmation/:userId", handleConfirmation)
  .use((req, res) => res.send("Not Found"))
  .listen(8000, () => console.log(`Listening on port 8000`));
