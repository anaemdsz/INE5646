const fs = require('fs');
const ejs = require('ejs');
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");

const { authenticate } = require("./src/auth");

const { handleLogin } = require("./routes/login");
const { handleViewBoard } = require("./routes/view-board");
const { handleCreateUser, handleGetAllUsers } = require("./routes/create-user");
const { handleLoadBoards, handleCreateBoards, handleDeleteBoard, handleCreateTask } = require("./routes/list-boards");

const dbURL =
  "mongodb+srv://antonio:6tytsjbFhChXDWka@cluster0.o6ecxhs.mongodb.net/?retryWrites=true&w=majority";
const dbClient = new MongoClient(dbURL);
const dbName = "KanbanBoard";

const app = express();

app.set('view engine', 'ejs');
app.set('views', './html');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const connectToDB = async () => {
  await dbClient.connect();
  console.log("Succesfully connected to the database server");
};

app.use(express.static("public"));

app.use((req, res, next) => {
  req.database = dbClient.db(dbName);
  next();
});

app.use(cookieParser());

app.use(authenticate);

// User related requests\
app.get("/login", async (req, res) =>
  res.send(await ejs.renderFile(path.join(__dirname, "html", "login.ejs")))
);

app.get("/create-user", async (req, res) =>
  res.send(await ejs.renderFile(path.join(__dirname, "html", "signup.ejs")))
);

app.get("/edit_user", async (req, res) =>
  res.send(await ejs.renderFile(path.join(__dirname, "html", "edit_user.ejs")))
);

app.get("/boards", async (req, res) => {
  let boards = await handleLoadBoards(req, res);
  res.send(await ejs.renderFile(path.join(__dirname, "html", "list_boards.ejs"), { boards : boards }));
});

app.get("/boards/:id", async (req, res) => {
  res.send(await ejs.renderFile(path.join(__dirname, "html", "view_board.ejs"), {
    board : await handleViewBoard(req, res),
    users : await handleGetAllUsers(req, res),
  }));
});

// Load resources
// app.get("/load-boards", urlencodedParser, handleLoadBoards);
// app.get("/view-board/:id", urlencodedParser, handleViewBoard)

// Post
app.post("/login", urlencodedParser, handleLogin);
app.post("/create-user", urlencodedParser, handleCreateUser);
app.post("/create-board", urlencodedParser, handleCreateBoards)
app.post("/boards/:id/delete", urlencodedParser, handleDeleteBoard)
app.post("/boards/:id/create-task", urlencodedParser, handleCreateTask)

// app.post("/edit-user", handleEditUser);

// Board related requests
// app.get("/boards", handleShowBoards);
// app.get("/boards/name", handleShowSpecificBoard);

// app.post("/delete-board", handleDeleteBoard);
// app.post("/create-board", handleCreateBoard);
// app.post("/add-task", handleAddTask);
// app.post("/invite-user", handleInviteUser);
// app.post("/move-task", handleMoveTask);
// app.post("/delete-task", handleDeleteTask);

app.listen(3001, async () => {
  await connectToDB();
  console.log("Express server succesfully started.");
});
