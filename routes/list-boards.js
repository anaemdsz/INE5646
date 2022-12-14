const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { Board } = require("../models/board");

module.exports = {
  handleLoadBoards: async (req, res, next) => {
    const boards = await new Board(req.database).findMany({ username  : req.user.username });

    console.log("Loaded boards succesfully.");

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ "boards" : boards }));

    next();
  },
  handleCreateBoards: async (req, res, next) => {

    console.log("creating boards...........................................");

    if (!req.body.name || req.body.name === "") {
      console.log("User attempted to create a board without providing a name");
      res.redirect("/list_boards?errorCode=1");
      return;
    }

    const data = {
      name: req.body.name ?? "",
      username: req.user.username ?? "",
    };

    const boardModel = new Board(req.database);
    await boardModel.create(data);

    console.log("Successfully created board", data);

    res.redirect("/list_boards");
  },
};
