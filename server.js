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

const connectToDB = async () => {
  await dbClient.connect();
  console.log("Succesfully connected to the database server");
};

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

app.use((req, res, next) => {
  req.database = dbClient.db(dbName);
  next();
});

app.post("/create-user", urlencodedParser, handleCreateUser);

app.listen(3000, async () => {
  await connectToDB();
  console.log("Express server succesfully started.");
});
