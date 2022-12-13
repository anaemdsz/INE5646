const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { jwtSecret } = require("../src/jwt");
const jwt = require("jsonwebtoken");

module.exports = {
  handleLogin: async (req, res) => {
    const userModel = new User(req.database);

    const user = await userModel.find({ username: req.body.username });

    if (!user) {
      console.log(
        "User login attempt failed, invalid username and/or password."
      );
      res.redirect("/login?errorCode=1");
      return;
    }

    const userHashedPassword = user.password;

    if (await bcrypt.compare(req.body.password, userHashedPassword)) {
      const jwtToken = jwt.sign({ username: user.username }, jwtSecret);
      res
        .cookie("authorization", jwtToken, { httpOnly: true, secure: true })
        .redirect("/boards");
      return;
    }
    console.log("User login attempt failed, invalid username and/or password.");
    res.redirect("/login?errorCode=1");
  },
};
