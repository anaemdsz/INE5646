const bodyParser = require("body-parser");
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { handleCreateUser } = require("./routes/create-user");
const { handleLogin } = require("./routes/login");
const path = require("path");
const { authenticate } = require("./src/auth");
const cookieParser = require("cookie-parser");

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
app.post("/create-user", urlencodedParser, handleCreateUser);
app.post("/login", urlencodedParser, handleLogin);
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
