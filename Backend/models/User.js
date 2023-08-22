const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String, // Make sure to add the correct data type for location
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);

//mongoose.model('user', UserSchema): This is a function call to the model() method provided by Mongoose. The model() method is used to create a Mongoose model based on a defined schema. It takes two arguments: the first argument is the name of the model, and the second argument is the schema you want to use for the model.