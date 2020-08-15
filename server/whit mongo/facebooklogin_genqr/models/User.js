const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ryu:test@cluster0.ljg2u.mongodb.net/facebookauth?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var userSchema = mongoose.Schema({
    uid: String,
    token: String,
    email: String,
    name: String,
    gender: String,
    pic: String,
    point: Number,
});

module.exports = mongoose.model('User', userSchema);