const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUser = async (req, res) => {
  res.json(req.user);
};

const userSignUp = async (req, res) => {
  let { username, email, password } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ message: "something is missing" });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: " email already exist" });
  }
  const hashed = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hashed });
  let token = await jwt.sign(
    { username, id: newUser._id },
    process.env.TOKEN_KEY
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.json({ token, user: newUser });
};

const userLogin = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "something is missing" });
  }

  let user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    let token = jwt.sign({ email, id: user._id }, process.env.TOKEN_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ token, message: "success" });
  } else {
    return res.status(500).json({ message: " wrong password" });
  }
};

const userLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { getAllUser, userSignUp, userLogin, userLogout };

// secure: false,
//   sameSite: "Lax",
//      res.cookie("token", token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === production,
//   sameSite:process.env.NODE_ENV === production ? "none" :"Lax",
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// });
//   res.cookie("token", token, {
//     httpOnly: true,
//      secure: true,
//   sameSite: "none",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });
