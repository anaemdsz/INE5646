const ejs = require('ejs');
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { MongoClient } = require("mongodb");

// Files
const { authenticate } = require("./src/auth");

const { handleLogin } = require("./routes/login");
const { handleCreateUser, handleEditUser, handleGetAllUsers } = require("./routes/users");
const { handleViewBoard, handleLoadBoards, handleCreateBoards,
        handleDeleteBoard, handleCreateTask, handleDeleteTask,
        handleAddUser, handleMoveTask  } = require("./routes/boards");

// const dbURL =
//   "mongodb+srv://antonio:6tytsjbFhChXDWka@cluster0.o6ecxhs.mongodb.net/?retryWrites=true&w=majority";
// const dbClient = new MongoClient(dbURL);
// const dbName = "KanbanBoard";

const DB_LOCAL = 'nuvem-database';
const dbURL = `mongodb://localhost/27017/${DB_LOCAL}`;
const dbClient = new MongoClient(dbURL, {useUnifiedTopology : true});
const dbName = "KanbanBoard";

// App
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

// Get

app.get("/login", async (req, res) =>
  res.send(await ejs.renderFile(path.join(__dirname, "html", "login.ejs"), {
    user : req.user
      ? { name : req.user.name, username : req.user.username }
      : null,
  }))
);

app.get("/logout", async (req, res) => {
  res.clearCookie('authorization', {path : '/'});
  res.redirect('/login');
});

app.get(["/", "/create-user"], async (req, res) =>
  res.send(await ejs.renderFile(path.join(__dirname, "html", "signup.ejs"), {
    user : req.user
      ? { name : req.user.name, username : req.user.username }
      : null,
  }))
);

app.get("/edit-user", async (req, res) =>
  res.send(await ejs.renderFile(path.join(__dirname, "html", "edit_user.ejs"), {
    user : req.user
      ? { name : req.user.name, username : req.user.username }
      : null,
  }))
);

app.get("/boards", async (req, res) => {
  let boards = await handleLoadBoards(req, res);
  res.send(await ejs.renderFile(path.join(__dirname, "html", "list_boards.ejs"), {
    user : req.user
      ? { name : req.user.name, username : req.user.username }
      : null,
    boards : boards
  }));
});

app.get("/boards/:id", async (req, res) => {
  res.send(await ejs.renderFile(path.join(__dirname, "html", "view_board.ejs"), {
    user : req.user
      ? { name : req.user.name, username : req.user.username }
      : null,
    board : await handleViewBoard(req, res),
    users : await handleGetAllUsers(req, res),
  }));
});

// Post
app.post("/login", urlencodedParser, handleLogin);
app.post("/edit-user", urlencodedParser, handleEditUser);
app.post("/create-user", urlencodedParser, handleCreateUser);
app.post("/create-board", urlencodedParser, handleCreateBoards);
app.post("/boards/:id/add-user", urlencodedParser, handleAddUser);
app.post("/boards/:id/delete", urlencodedParser, handleDeleteBoard);
app.post("/boards/:id/create-task", urlencodedParser, handleCreateTask);
app.post("/boards/:id/move-task/:taskId", urlencodedParser, handleMoveTask);
app.post("/boards/:id/delete-task/:taskId", urlencodedParser, handleDeleteTask);

// Init server
app.listen(3001, async () => {
  await connectToDB();
  console.log("Express server succesfully started.");
});
