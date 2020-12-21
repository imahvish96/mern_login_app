const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../model/User");

router.get("/login", (req, res) => res.render("login"));
router.get("/signup", (req, res) => res.render("signup"));
router.get("/dashboard", (req, res) => res.render("dashboard"));

/* router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: "Invalid Email or Password Try Again!!",
  })
); */

router.post("/signup", (req, res) => {
  let { name, email, password } = req.body;
  let userData = {
    name: name,
    email: email,
  };
  console.log(userData);
  User.register(userData, password, (err, user) => {
    if (err) {
      console.log(`ERROR ${err}`);
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("signup");
    }
    passport.authenticate("local")(req, res, () => {
      console.log("Hello World");
      req.flash("success_msg", "Success Account Created Successfully");
      res.redirect("/login");
    });
  });
});

module.exports = router;
