const bcrypt = require("bcrypt");
let mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
const User = mongoose.model("user", userSchema);

mongoose
  .connect("mongodb://127.0.0.1:27017/data-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error: ", err));

function isValidEmail(email) {
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailFormat.test(email);
}

const hashPass = async (passW) => {
  let hash = await bcrypt.hash(passW, 10);
  return hash;
};

const comparePass = async (simplePass, hashPass) => {
  let isMatch = await bcrypt.compare(simplePass, hashPass);
  return isMatch;
};

exports.postUser = async (req, res) => {
  const { email, password } = req.body;
  const hash = await hashPass(password);
  const matchPass = await comparePass(password, hash);

  if (!email) {
    return res.send("Please enter value");
  }

  if (!isValidEmail(email)) {
    return res.send("Format is not valid");
  }
  if (matchPass) {
    res.send("Successfully Added");
  } else {
    return;
  }
  const result = await User.create({
    email: email,
    password: hash,
  });
};

exports.getUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.send(allUsers);
};

exports.patchUser = async (req, res) => {
  const { _id, email, password } = req.body;
  const hash = await hashPass(password);
  let updateUser = await User.findOneAndUpdate(
    { _id },
    { $set: {email, password: hash}, },
    { new: true }
  );
  res.send("User Updated");
};
