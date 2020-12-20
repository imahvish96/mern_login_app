const mongooes = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let authSehema = mongooes.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
});

authSehema.plugin(passportLocalMongoose, { usernameField: "name" });

module.exports = mongooes.model("User", authSehema);
