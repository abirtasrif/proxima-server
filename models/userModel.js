const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  //validation (if empty)
  if (!email || !password) {
    throw Error("All fields required");
  }

  //email validation
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email Address");
  }

  //pass validation
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Weak Password ! Combine uppercase, lowercase, number, symbols at least 8 digits"
    );
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email already used");
  }

  //hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //create user
  const user = await this.create({ email: email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  //validation (if empty)
  if (!email || !password) {
    throw Error("All fields required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("incorrect mail");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Password Error");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
