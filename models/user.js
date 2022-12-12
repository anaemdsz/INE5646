const uuid = require("uuid");

class User {
  constructor(db) {
    this.db = db;
  }

  async create(userData) {
    const data = { _id: uuid.v4(), ...userData };
    await this.db.collection("users").insertOne(data);
    console.log("User succesfully created", { data });
  }

  async update(id, newData) {
    const result = await this.db
      .collection("users")
      .updateOne({ _id: id }, newData);

    result.matchedCount > 0
      ? console.log("Succesfully updated the user", { result })
      : console.log("Couldn't find the required user", { id, newData, result });
  }

  async find(filter) {
    const result = await this.db.collection("users").findOne(filter);

    result
      ? console.log("Succesfully retrived the user", { result })
      : console.log("Failed to find the user.", { filter });
    return result;
  }
}

module.exports = {
  User,
};
