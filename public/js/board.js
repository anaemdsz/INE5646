const uuid = require("uuid");

class Board {
  constructor(db) {
    this.db = db;
    this.todo = [];
    this.doing = [];
    this.done = [];
  }

  async create(boardData) {
    const document = { _id: uuid.v4(), ...boardData };
    await this.db.collection("boards").insertOne(document);
    console.log("Successfully created board", { document });
  }

  async update(id, updatedData) {
    const result = await this.db
      .collection("boards")
      .updateOne({ _id: id }, updatedData);

    result.matchedCount > 0
      ? console.log("Successfully updated the board", { result })
      : console.log("Couldn't find the required board", { id, updatedData });
  }

  async find(query) {
    const result = await this.db.collection("boards").findOne(query);

    result
      ? console.log("Successfully retrieved the board", { reuslt })
      : console.log("Failed to find a board", { query });
  }
}

module.exports = {
  Board,
};
