const express = require("express");
const router = express.Router();

const validateCarInput = require("../../validation/car");

const Car = require("../../models/Car");

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

router.get("/get", (req, res) => {
    Car.find({}).then(cars => {
        res.json(cars)
    }).catch(err => console.log(err))
});


//     // @route POST api/users/login
// // @desc Login user and return JWT token
// // @access Public
// router.post("/login", (req, res) => {
//     // Form validation
//   const { errors, isValid } = validateLoginInput(req.body);
//   // Check validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
//   const email = req.body.email;
//     const password = req.body.password;
//   // Find user by email
//     User.findOne({ email }).then(user => {
//       // Check if user exists
//       if (!user) {
//         return res.status(404).json({ emailnotfound: "Email not found" });
//       }
//   // Check password
//       bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//           // User matched
//           // Create JWT Payload
//           const payload = {
//             id: user.id,
//             name: user.name
//           };
//   // Sign token
//           jwt.sign(
//             payload,
//             keys.secretOrKey,
//             {
//               expiresIn: 31556926 // 1 year in seconds
//             },
//             (err, token) => {
//               res.json({
//                 success: true,
//                 token: "Bearer " + token
//               });
//             }
//           );
//         } else {
//           return res
//             .status(400)
//             .json({ passwordincorrect: "Password incorrect" });
//         }
//       });
//     });
//   });

//   // @route GET api/users/currentuser
// // @desc Return current user
// // @access Private
// router.get(
//     "/currentuser",
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//       res.json({
//         id: req.user.id,
//         name: req.user.name,
//         email: req.user.email,
//         admin: req.user.admin
//       });
//     }
//   );

module.exports = router;