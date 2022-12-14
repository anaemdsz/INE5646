const bcrypt = require("bcrypt");
const { Board } = require("../models/board");


module.exports = {
  handleViewBoard: async (req, res, next) => {
    const board = await new Board(req.database).find({ _id  : req.params.id });
    if (!board) {
      console.log("Error loading board.");
    }
    return board;
  },
};
