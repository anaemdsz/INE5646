const uuid = require("uuid");

class Task {
  constructor(db) {
    this.db = db;
  }

  async create(taskData) {
    const document = { _id: uuid.v4(), ...taskData };
    await this.db.collection("tasks").insertOne(document);
    console.log("Successfully created task", { document });
  }

  async update(id, updatedData) {
    const result = await this.db
      .collection("tasks")
      .updateOne({ _id: id }, updatedData);

    result.matchedCount > 0
      ? console.log("Successfully updated the task", { result })
      : console.log("Couldn't find the required task", { id, updatedData });
  }

  async find(query) {
    const result = await this.db.collection("tasks").findOne(query);

    result
      ? console.log("Successfully retrieved the task", { result })
      : console.log("Failed to find a task.", { query });
    return result;
  }

  async findMany(query) {
    const result = await this.db.collection("tasks").find(query).toArray();

    result
      ? console.log("Successfully retrieved the tasks", { result })
      : console.log("Failed to find the tasks.", { query });
    return result;
  }
}

module.exports = {
  Task,
};
