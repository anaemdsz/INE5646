const bodyParser = require("body-parser");
const express = require("express");
const { MongoClient } = require("mongodb");
const { User } = require("./models/user");
const bcrypt = require("bcrypt");
const { handleCreateUser } = require("./routes/create-user");

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

// User related requests
app.post("/create-user", urlencodedParser, handleCreateUser);
// app.post("/login", handleLogin);
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

app.listen(3000, async () => {
  await connectToDB();
  console.log("Express server succesfully started.");
});
