const uuid = require("uuid");
const { Board } = require("../models/board");

module.exports = {
  handleLoadBoards: async (req, res) => {
    const boards = await new Board(req.database).findMany( { $or : [ { username : req.user.username }, { users : req.user.username } ] });
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

    if (!board.username === req.user.username) {
      console.log("User not allowed to delete this board.");
      res.redirect("/boards?errorCode=3");
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
      _id : uuid.v4(),
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
  },
  handleDeleteTask: async (req, res, next) => {
    const boardId = req.params.id;
    const boardModel = new Board(req.database);
    const board = await boardModel.find({ _id : boardId });

    if (!board) {
      console.log("Board not found.");
      res.redirect("/boards?errorCode=2");
      return;
    }

    const taskId = req.params.taskId;
    board.todoTasks = (board.todoTasks ?? []).filter(x => x._id != taskId);
    board.doingTasks = (board.doingTasks ?? []).filter(x => x._id != taskId);
    board.doneTasks = (board.doneTasks ?? []).filter(x => x._id != taskId);

    await boardModel.update(boardId, board);

    console.log(`Deleted task ${taskId}.`);

    res.redirect(`/boards/${boardId}`);
  },
  handleMoveTask: async (req, res, next) => {
    const boardId = req.params.id;
    const boardModel = new Board(req.database);
    const board = await boardModel.find({ _id : boardId });

    if (!board) {
      console.log("Board not found.");
      res.redirect("/boards?errorCode=2");
      return;
    }

    const taskId = req.params.taskId;
    const shouldMoveLeft = req.body.shouldMoveLeft === "true";
    const shouldMoveRight = !shouldMoveLeft;

    board.todoTasks = board.todoTasks ?? [];
    board.doingTasks = board.doingTasks ?? [];
    board.doneTasks = board.doneTasks ?? [];

    // Search for task in lists
    todoTasksFound = (board.todoTasks ?? []).filter(x => x._id == taskId);
    doingTasksFound = (board.doingTasks ?? []).filter(x => x._id == taskId);
    doneTasksFound = (board.doneTasks ?? []).filter(x => x._id == taskId);

    // Remove task from all lists
    if (todoTasksFound.length > 0 && shouldMoveRight) {
      board.todoTasks = (board.todoTasks ?? []).filter(x => x._id != taskId);
      board.doingTasks.push(todoTasksFound[0]);
    }

    if (doingTasksFound.length > 0) {
      board.doingTasks = (board.doingTasks ?? []).filter(x => x._id != taskId);
      if (shouldMoveLeft) {
        board.todoTasks.push(doingTasksFound[0]);
      }
      if (shouldMoveRight) {
        board.doneTasks.push(doingTasksFound[0]);
      }
    }

    if (doneTasksFound.length > 0 && shouldMoveLeft) {
      board.doneTasks = (board.doneTasks ?? []).filter(x => x._id != taskId);
      board.doingTasks.push(doneTasksFound[0]);
    }

    await boardModel.update(boardId, board);

    console.log(`Moved task ${taskId}.`);

    res.redirect(`/boards/${boardId}`);
  },
  handleAddUser: async (req, res, next) => {
    const boardId = req.params.id;
    const boardModel = new Board(req.database);
    let board = await boardModel.find({ _id : boardId });

    if (!board) {
      console.log("Board not found.");
      res.redirect(`/boards/?errorCode=2`);
      return;
    }

    let users = board.users ?? [];
    users.push(req.body.username);
    board.users = users;

    await boardModel.update(boardId, board);

    console.log(`Updated board ${boardId}.`);

    res.redirect(`/boards/${boardId}`);
  },
};
