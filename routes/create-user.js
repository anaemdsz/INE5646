const { User } = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  handleCreateUser: async (req, res) => {
    if (!req.body.password || req.body.password === "") {
      console.log(
        "User attempted to create an account without providing a password"
      );
      res.redirect("/html/signup.html?errorCode=1");
      return;
    }

    if (!req.body.username || req.body.username === "") {
      console.log(
        "User attempted to create an account without providing an username"
      );
      res.redirect("/html/signup.html?errorCode=2");
      return;
    }

    if (req.body.confPassword !== req.body.password) {
      console.log("User's passwords do not match");
      res.redirect("/html/signup.html?errorCode=3");
      return;
    }

    const data = {
      name: req.body.name ?? "",
      email: req.body.email ?? "",
      username: req.body.username ?? "",
      password: await bcrypt.hash(req.body.password, 10),
    };

    const userModel = new User(req.database);
    const user = await userModel.find({ username: data.username });

    if (user) {
      console.log(
        "User attempted to create an account with an username that was already taken."
      );
      res.redirect("/html/signup.html?errorCode=4");
      return;
    }

    await userModel.create(data);

    res.redirect("/html/login.html");
  },
};
