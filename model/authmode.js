const mongooes = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let authSehema = mongooes.Schema({
  username: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
});

authSehema.plugin(passportLocalMongoose);

module.exports = mongooes.model("User", authSehema);
