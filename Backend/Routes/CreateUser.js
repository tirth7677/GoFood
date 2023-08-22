const express = require("express");
const user = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtseceret = "goHOfrdLaKjsigQoYrTVTYEt32XKAkQu"

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let setpassword = await bcrypt.hash(req.body.password, salt)

    try {
      await user
        .create({
          name: req.body.name,
          location: req.body.location,
          password: setpassword,
          email: req.body.email,
        })
        .then(
          res.json({
            success: true,
          })
        );
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
      });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    let email = req.body.email;
    try {
      let userdata = await user.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ error: "Try Logging with correct credientials" });
      }
      const pwdcompare = await bcrypt.compare(req.body.password,userdata.password)
      if (!pwdcompare) {
        return res
          .status(400)
          .json({ error: "Password incorrect" });
      }
      const data = {
        user: {
          id: userdata.id
        }
      }
      // here data is payload
      const authtoken = jwt.sign(data,jwtseceret)
      return res.json({ success: true , authtoken: authtoken});
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
      });
    }
  }
);

module.exports = router;
