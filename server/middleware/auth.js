const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // console.log(req.cookies )
  let token = req.cookies["gemini-token"];

  if (!token) {
    console.log("in auth.js token is missing");
    // return res.status(400).json({ message: "maybe token is missing" });
    req.token = false;
    next();
  }
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      // res.status(400).json({ message: "maybe invalid token " });
      console.log("in line 16 invalid token in auth.js");
      req.token = false;
      next();
    } else {
      req.token = true;
      req.user = decoded;
      next();
    }
  });
};

module.exports = verifyToken;
