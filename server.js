const express = require("express");
const { MongoClient } = require("mongodb");

const dbURL =
  "mongodb+srv://antonio:6tytsjbFhChXDWka@cluster0.o6ecxhs.mongodb.net/?retryWrites=true&w=majority";
const dbClient = new MongoClient(dbURL);
const dbName = "KanbanBoard";

const app = express();

const connectToDB = async () => {
  await dbClient.connect();
  console.log("Succesfully connected to the database server");
};

app.use(express.static("public"));

app.listen(3000, async () => {
  await connectToDB();
  console.log("Express server succesfully started.");
});
