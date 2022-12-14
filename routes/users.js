const { User } = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  handleCreateUser: async (req, res) => {
    if (!req.body.password || req.body.password === "") {
      console.log(
        "User attempted to create an account without providing a password"
      );
      res.redirect("/create-user?errorCode=1");
      return;
    }

    if (!req.body.username || req.body.username === "") {
      console.log(
        "User attempted to create an account without providing an username"
      );
      res.redirect("/create-user?errorCode=2");
      return;
    }

    if (req.body.confPassword !== req.body.password) {
      console.log("User's passwords do not match");
      res.redirect("/create-user?errorCode=3");
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
      res.redirect("/create-user?errorCode=4");
      return;
    }

    await userModel.create(data);

    res.redirect("/login");
  },
  handleEditUser: async (req, res) => {

    if (!req.body.name || req.body.name === "") {
      console.log(
        "User attempted to edit account without providing an name"
      );
      res.redirect("/edit-user?errorCode=1");
      return;
    }

    if (!req.body.email || req.body.email === "") {
      console.log(
        "User attempted to edit account without providing an email"
      );
      res.redirect("/edit-user?errorCode=2");
      return;
    }

    if (!req.body.password || req.body.password === "") {
      console.log(
        "User attempted to edit account without providing a password"
      );
      res.redirect("/edit-user?errorCode=3");
      return;
    }

    if (req.body.confPassword !== req.body.password) {
      console.log("User's passwords do not match");
      res.redirect("/edit-user?errorCode=4");
      return;
    }

    const data = {
      name: req.body.name ?? "",
      email: req.body.email ?? "",
      password: await bcrypt.hash(req.body.password, 10),
    };

    const userModel = new User(req.database);
    const user = await userModel.find({ username: req.user.username });

    if (!user) {
      console.log(
        "User attempted to edit account that does not exist."
      );
      res.redirect("/edit-user?errorCode=5");
      return;
    }

    await userModel.update(req.user.username , data)

    res.redirect("/boards");
  },
  handleGetAllUsers: async (req, res) => {
    const users = new User(req.database).findMany({});
    return users;
  }
};
