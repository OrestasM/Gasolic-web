const express = require("express");
const router = express.Router();
const axios = require("axios");

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

router.get("/makes", (req, res) => {
    axios.get("https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes")
            .then(response=>{
                let make = response.data;
                make = make.replace("?","");
                make = make.replace("(","");
                make = make.replace(")","")
                make = make.replace(";","")
                make = JSON.parse(make);
                res.send(make)
                
            })
            .catch(err=>res.send(err))
});

router.get("/models=:make", (req, res) => {
    axios.get("https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make="+req.params.make)
        .then(response=>{
            let model = response.data;
            model = model.replace("?","");
            model = model.replace("(","");
            model = model.replace(")","")
            model = model.replace(";","")
            model = JSON.parse(model);
            res.send(model)
        })
        .catch(err=>res.send(err))
});


module.exports = router;