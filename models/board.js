const uuid = require("uuid");

class Board {
  constructor(db) {
    this.db = db;
  }

  async create(boardData) {
    const document = { _id: uuid.v4(), ...boardData };
    await this.db.collection("boards").insertOne(document);
    console.log("Successfully created board", { document });
  }

  async update(id, updatedData) {
    const result = await this.db
      .collection("boards")
      .updateOne({ _id: id }, { $set : updatedData });

    result.matchedCount > 0
      ? console.log("Successfully updated the board", { result })
      : console.log("Couldn't find the required board", { id, updatedData });
  }

  async find(query) {
    const result = await this.db.collection("boards").findOne(query);

    result
      ? console.log("Successfully retrieved the board", { result })
      : console.log("Failed to find a board.", { query });
    return result;
  }

  async findMany(query) {
    const result = await this.db.collection("boards").find(query).toArray();

    result
      ? console.log("Successfully retrieved the boards", { result })
      : console.log("Failed to find the boards.", { query });
    return result;
  }

  async deleteOne(query) {
    const result = await this.db.collection("boards").deleteOne(query);
    return result;
  }
}

module.exports = {
  Board,
};
