const express = require("express");
const router = express.Router();

const validateConsumptionInput = require("../../validation/consumption");

const Consumption = require("../../models/Consumption");

router.post("/add", (req, res) => {

  const { errors, isValid } = validateConsumptionInput(req.body);
  
    if (!isValid) {
        return res.status(400).json(errors);
    }

  const newConsumption = new Consumption({
          car: req.body.car,
          mileage: req.body.mileage,
          fuelUsed: req.body.fuelUsed,
          price: req.body.price,
          trip: req.body.trip
        });

    newConsumption
        .save()
        .then(consumption => res.json(consumption))
        .catch(err => console.log(err));
});

router.get("/get/:id", (req, res) => {
    Consumption.find({ car: req.params.id })
        .then(consumptions => res.json(consumptions))
        .catch(err => console.log(err))
});

router.get("/get", (req, res) => {
    Consumption.find({})
        .then(consumptions => res.json(consumptions))
        .catch(err => console.log(err))
});

module.exports = router;