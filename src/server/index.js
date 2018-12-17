const os = require("os");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const db = require("../config/keys_dev").mongoURI;
const users = require("./routes/api/users");
const cars = require("./routes/api/cars")
const passport = require("passport");

const app = express();

app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/car", cars);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(express.static("dist"));
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);
app.listen(8080, () => console.log("Listening on port 8080!"));