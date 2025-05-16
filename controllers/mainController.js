const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../Models/signup");
const Login = require("../Models/logIn");

// DB Connection

mongoose
  .connect("mongodb://127.0.0.1:27017/data-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error: ", err));

// Password Hashing
const hashPassword = async (simplePass) => {
  let hashedPass = await bcrypt.hash(simplePass, 10);
  return hashedPass;
};

//Compare Password
const comparePass = async (simplePass, hashedPass) => {
  const isMatch = await bcrypt.compare(simplePass, hashedPass);
  return isMatch;
}

//Post User
const postUser = async (req, res) => {
  const users = req.body;
  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      const passH = await hashPassword(user.password);
      return { ...user, password: passH };
    })
  );
  const result = await User.insertMany(hashedUsers);
  res.send("succesful");
};

//Get User
const getUsers = async (req, res) => {
  const usersData = await User.find({});
  res.send(usersData);
};

//Patch User
let updateUser;
const patchUser = async (req, res) => {
  updateUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.send("User Updated");
};

//Put or Replace User
const putUser = async (req, res) => {
  try {
    const users = req.body;
    const hashedUser = [];
    for (let user of users) {
      const hashPass = await hashPassword(user.password);
      const result = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            ...user,
            password: hashPass,
          },
        },
        {
          new: true,
          overwrite: true,
        }
      );

      hashedUser.push(result);
      console.log(result);
    }
    res.send("User Replaced");
  } catch (err) {
    res.send(err);
  }
};

//Delete User
const deleteUser = async (req, res) => {
  const { ids } = req.body;
  const deletedUser = [];
  for (let id of ids) {
    const delUser = await User.findByIdAndDelete(id);
    deletedUser.push(delUser);
  }
  res.send("User Deleted");
};

//Login User
const loginUser = async (req, res) => {
  const { password } = req.body;
  const user = req.findUser;
  let passCheck = await comparePass(password, user.password)
  if (passCheck) {
    res.send("Succesfully logged In");
  } else {
    res.send("Password not matched");
  }
};

module.exports = {
  postUser,
  getUsers,
  deleteUser,
  patchUser,
  putUser,
  loginUser,
};
