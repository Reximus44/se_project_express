const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is required"],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: [true, "An email is required"],
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const error = new Error("Incorect email or Password");
        error.name = "ValidationError";
        return Promise.reject(error);
      }

      return bcrypt.compare(password, user.password).then((isCorrect) => {
        if (isCorrect) {
          return user;
        }
        throw new Error("Password incorrect");
      });
    });
};

module.exports = mongoose.model("user", userSchema);
