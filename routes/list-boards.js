const bcrypt = require("bcrypt");
const { Board } = require("../models/board");

module.exports = {
  handleLoadBoards: async (req, res) => {
    const boards = await new Board(req.database).findMany({ username  : req.user.username });
    console.log("Loaded boards succesfully.");
    return boards;
  },
  handleCreateBoards: async (req, res, next) => {
    if (!req.body.name || req.body.name === "") {
      console.log("User attempted to create a board without providing a name");
      res.redirect("/boards?errorCode=1");
      return;
    }

    const data = {
      name: req.body.name ?? "",
      username: req.user.username ?? "",
    };

    const boardModel = new Board(req.database);
    await boardModel.create(data);

    console.log("Successfully created board", data);

    res.redirect("/boards");
  },
  handleDeleteBoard: async (req, res, next) => {
    const boardId = req.params.id;
    const boardModel = new Board(req.database);
    const board = await boardModel.find({ _id : boardId });

    if (!board) {
      console.log("Board not found.");
      res.redirect("/boards?errorCode=2");
      return;
    }

    boardModel.deleteOne({ _id : boardId });

    res.redirect("/boards");
  },
  handleCreateTask: async (req, res, next) => {
    const boardId = req.params.id;
    const boardModel = new Board(req.database);
    let board = await boardModel.find({ _id : boardId });

    if (!board) {
      console.log("Board not found.");
      res.redirect(`/boards/?errorCode=2`);
      return;
    }

    const task = {
      name : req.body.name ?? "Sem título.",
      username : req.body.username ?? "Nenhum.",
    }

    switch (req.body.column) {
      case "2":
        let doingTasks = board.doingTasks ?? [];
        doingTasks.push(task);
        board.doingTasks = doingTasks;
        break;
      case "3":
        let doneTasks = board.doneTasks ?? [];
        doneTasks.push(task);
        board.doneTasks = doneTasks;
        break;
      case "1":
      default:
        let todoTasks = board.todoTasks ?? [];
        todoTasks.push(task);
        board.todoTasks = todoTasks;
        break;
    }

    await boardModel.update(boardId, board);

    console.log(`Updated board ${boardId}.`);

    res.redirect(`/boards/${boardId}`);
  }
};
