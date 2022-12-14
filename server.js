const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");

const { authenticate } = require("./src/auth");

const { handleLogin } = require("./routes/login");
const { handleLoadTasks } = require("./routes/view-board");
const { handleCreateUser } = require("./routes/create-user");
const { handleLoadBoards, handleCreateBoards, handleDeleteBoard } = require("./routes/list-boards");

const dbURL =
  "mongodb+srv://antonio:6tytsjbFhChXDWka@cluster0.o6ecxhs.mongodb.net/?retryWrites=true&w=majority";
const dbClient = new MongoClient(dbURL);
const dbName = "KanbanBoard";

const app = express();

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
app.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "html", "login.html"))
);

app.get("/create-user", (req, res) =>
  res.sendFile(path.join(__dirname, "html", "signup.html"))
);

app.get("/edit_user", (req, res) =>
  res.sendFile(path.join(__dirname, "html", "edit_user.html"))
);

app.get("/list_boards", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "list_boards.html"));
});

app.get("/view_board", (req, res) =>
  res.sendFile(path.join(__dirname, "html", "view_board.html"))
);

// Load resources
app.get("/load-boards", urlencodedParser, handleLoadBoards);
app.get("/load-tasks", urlencodedParser, handleLoadTasks);

// Post
app.post("/login", urlencodedParser, handleLogin);
app.post("/create-user", urlencodedParser, handleCreateUser);
app.post("/create-board", urlencodedParser, handleCreateBoards)
app.post("/delete-board/:id", urlencodedParser, handleDeleteBoard)
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
