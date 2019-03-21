import axios from "axios";
import {
  GET_ERRORS,
} from "./types";
// Register User
export const addCar = (carData, history) => dispatch => {

  axios
    .post("/api/car/add", carData)
    .then(err => {
      history.push("/home")
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    })
    .catch(err => {

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })

};

export const addConsumption = (consumptionData, history) => dispatch => {

  axios
    .post("/api/consumptions/add", consumptionData)
    .then(err => {
      history.push("/home")
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })

};

export const editConsumption = (consumptionData, id, history) => dispatch => {

  axios
    .put("/api/consumptions/add/"+id, consumptionData)
    .then(err => {
      history.push("/home")
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })

};