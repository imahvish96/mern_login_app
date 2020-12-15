const express = require("express");
const mongooes = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/loginRoutes");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const dotenv = require("dotenv");
const flash = require("express-flash");
const path = require("path");
const User = require("./model/authmode");
const { authenticate } = require("passport");

const app = express();

dotenv.config({ path: "./config.env" });

mongooes.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(
  session({
    secret: "just simple login app",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(authRoutes);

app.listen(process.env.PORT, (req, res) => console.log("Port is running"));
