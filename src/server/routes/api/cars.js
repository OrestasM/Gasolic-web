const express = require("express");
const router = express.Router();

const validateCarInput = require("../../validation/car");

const Car = require("../../models/Car");
const Consumption = require("../../models/Consumption");

router.post("/add", (req, res) => {

  let { errors, isValid } = validateCarInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
  const newCar = new Car({
          make: req.body.make,
          model: req.body.model,
          year: req.body.year,
          licensePlate: req.body.licensePlate,
          engine: req.body.engine,
          owner: req.body.owner,
          currentMileage: req.body.currentMileage
        });

    newCar
        .save()
        .then(car => {
            return res.status(200).json({});
        })
        .catch(err => console.log(err));

});

router.get("/get/:id", (req, res) => {
    Car.find({ owner: req.params.id }).then(cars => {
        res.json(cars)
    }).catch(err => console.log(err))
});

router.get("/get/single/:id", (req, res) => {
    Car.find({ _id: req.params.id }).then(cars => {
        res.json(cars)
    }).catch(err => console.log(err))
});

router.delete("/get/single/:id", (req, res) => {
    Car.deleteOne({ _id: req.params.id }).then(cars => {
        Consumption.deleteMany({car:req.params.id}).then(response => {
            res.sendStatus(200)
         }).catch(err=>console.log(err))
    }).catch(err => console.log(err))

    
});

router.get("/get", (req, res) => {
    Car.find({}).then(cars => {
        res.json(cars)
    }).catch(err => console.log(err))
});


module.exports = router;