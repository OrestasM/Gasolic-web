const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateConsumptionInput(data) {
  let errors = {};

  data.car = !isEmpty(data.car) ? data.car : "";
  data.mileage = !isEmpty(data.mileage) ? data.mileage : "";
  data.trip = !isEmpty(data.trip) ? data.trip : "";
  data.fuelUsed = !isEmpty(data.fuelUsed) ? data.fuelUsed : "";
  data.price = !isEmpty(data.price) ? data.price : "";

if (!Validator.isInt(data.mileage.toString())) {
    errors.mileage = "Car mileage must be numeric";
}
if (!Validator.isDecimal(data.price.toString())) {
    errors.price = "Fuel price must be decimal";
}
if (!Validator.isDecimal(data.fuelUsed.toString())) {
    errors.fuelUsed = "Fuel price must be decimal";
}
if (!Validator.isDecimal(data.trip.toString())) {
    errors.trip = "Trip mileage must be decimal";
}

if (Validator.isEmpty(data.car)) {
    errors.car = "Car id field is required";
}
if (Validator.isEmpty(data.mileage.toString())) {
    errors.mileage = "Car mileage field is required";
}
if (Validator.isEmpty(data.trip.toString())) {
    errors.trip = "Car trip mileage field is required";
}
if (Validator.isEmpty(data.fuelUsed.toString())) {
    errors.fuelUsed = "Used fuel field is required";
}
if (Validator.isEmpty(data.price.toString())) {
    errors.price = "Fuel price field is required";
}

return {
    errors,
    isValid: isEmpty(errors)
  };
};