"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { flights } = require("./test-data/flightSeating");
const { reservations } = require("./test-data/reservations");
let reservationCounter = 1;

const handleFlight = (req, res) => {
  const { flightNumber } = req.params;
  // get all flight numbers
  const allFlights = Object.keys(flights);
  // is flightNumber in the array?
  console.log("REAL FLIGHT: ", allFlights.includes(flightNumber));
  res.status(200).send(flights[flightNumber]);
};
const handleUser = (req, res) => {
  let newReservation = req.body;
  reservationCounter++;
  newReservation.id = reservationCounter;
  reservations.push(newReservation);
  res.status(201).send("okay boss");
};
const handleConfirmation = (req, res) => {
  const user =
    reservations[
      reservations.findIndex((element) => element.id === reservationCounter)
    ];
  res.status(200).json({
    flight: user.flight,
    seat: user.seat,
    name: user.givenName + " " + user.surname,
    email: user.email,
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
  .get("/flights/:flightNumber", handleFlight)
  .post("/users", handleUser)
  .get("/confirmation", handleConfirmation)
  .use((req, res) => res.send("Not Found"))
  .listen(8000, () => console.log(`Listening on port 8000`));
