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

  async update(username, newData) {
    const result = await this.db
      .collection("users")
      .updateOne({ username: username }, { $set : newData });

    result.matchedCount > 0
      ? console.log("Succesfully updated the user", { result })
      : console.log("Couldn't find the required user", { username, newData, result });
  }

  async find(filter) {
    const result = await this.db.collection("users").findOne(filter);

    result
      ? console.log("Succesfully retrived the user", { result })
      : console.log("Failed to find the user.", { filter });
    return result;
  }

  async findMany(query) {
    const result = await this.db.collection("users").find(query).toArray();

    result
      ? console.log("Successfully retrieved the users", { result })
      : console.log("Failed to find the users.", { query });
    return result;
  }
}

module.exports = {
  User,
};
