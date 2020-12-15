const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../model/authmode");

router.get("/", (req, res) => res.render("index"));
router.get("/signup", (req, res) => res.render("signup"));

router.post("/signup", (req, res) => {
  let { username, email, password } = req.body;
  let auth = {
    username: username,
    email: email,
  };
  User.register(auth, password, (err, user) => {
    if (err) {
      req.flash("error_mst", "ERROR" + err);
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success_mst", "Account Created Successfully");
      res.redirect("/");
    });
  });
});
module.exports = router;
