const os = require("os");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const db = require("../config/keys_dev").mongoURI;
const users = require("./routes/api/users");
const cars = require("./routes/api/cars")
const consumptions = require("./routes/api/consumptions")
const passport = require("passport");
const path = require("path");

const app = express();
var DIST_DIR = path.join(__dirname, "../../build");
var PORT = 8080;

app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/car", cars);
app.use("/api/consumptions", consumptions);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(express.static(DIST_DIR));

app.get("*", function (req, res) {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);
app.listen(PORT, () => console.log("Listening on port " + PORT + "!"));