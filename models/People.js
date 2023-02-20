const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    emailVerified: Boolean,
    photoUrl: String,
    provider: String,
    password:String,
    uid: String,
   
  },
  {
    timestamps: true,
  }
);

const People = mongoose.model("People", peopleSchema);

module.exports = People;
