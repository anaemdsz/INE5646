const { User } = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  handleLogin: async (req, res) => {
    const userModel = new User(req.database);

    const user = await userModel.find({ username: req.body.username });

    if (!user) {
      res.redirect("/html/login.html?erroCode=1");
      return;
    }

    //login...
    const userHashedPassword = user.password;

    if (await bcrypt.compare(req.body.password, userHashedPassword)) {
    }
    res.redirect("/html/list_boards.html");
  },
};
