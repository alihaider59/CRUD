const User = require("../Models/signup");

const middleware = async (req, res, next) => {
  const { username } = req.body;
  let findUser = await User.findOne({ username });
  if (!findUser) {
    res.send("User not exist");
  } else {
    req.findUser = findUser;
    next();
  }
};

module.exports = middleware;