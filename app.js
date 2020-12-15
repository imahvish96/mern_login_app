const express = require("express");
const mongooes = require("mongoose");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/loginRoutes");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(authRoutes);

app.listen(8000, (req, res) => console.log("Port is running"));
