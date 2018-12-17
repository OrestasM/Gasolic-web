const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateCarInput(data) {
  let errors = {};

  data.make = !isEmpty(data.make) ? data.make : "";
  data.model = !isEmpty(data.model) ? data.model : "";
  data.year = !isEmpty(data.year) ? data.year : "";
  data.currentMileage = !isEmpty(data.currentMileage) ? data.currentMileage : "";

if (Validator.isEmpty(data.make)) {
    errors.make = "Car make field is required";
}

if (Validator.isEmpty(data.model)) {
    errors.model = "Car model field is required";
}

if (Validator.isEmpty(data.year.toString())) {
    errors.year = "Car year field is required";
}

if (Validator.isEmpty(data.currentMileage.toString())) {
    errors.currentMileage = "Car mileage field is required";
}

if (!Validator.isAlphanumeric(data.make)) {
    errors.make = "Car make must be alphanumeric";
}

if (!Validator.isInt(data.engine.toString())) {
    errors.engine = "Car engine must be numeric";
}

if (!Validator.isAlphanumeric(data.licensePlate)) {
    errors.licensePlate = "Car license plate must be alphanumeric";
}

if (!Validator.isInt(data.year.toString())) {
    errors.year = "Car year must be numeric";
}

if (!Validator.isInt(data.currentMileage.toString())) {
    errors.currentMileage = "Car current mileage must be numeric";
}


return {
    errors,
    isValid: isEmpty(errors)
  };
};