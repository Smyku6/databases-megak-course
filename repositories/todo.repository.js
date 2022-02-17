const {v4: uuid} = require("uuid");
const {pool} = require("../utils/db");
const {ToDoRecord} = require("../records/todo.record");

class TodoRepository {

  static _checkRecord(record) {
    if (!(record instanceof ToDoRecord)) {
      throw new Error('Record must be an instance of ToDoRecord');
    }
    console.log('Checking passed')
  }

  static async insert(record) {
    TodoRepository._checkRecord(record);
    record.id = record.id ?? uuid();

    await pool.execute('INSERT INTO `todos` VALUES(:id, :text)', {
      id: record.id,
      text: record.text,
    });
    console.log(`New todo item added with ID ${record.id}`);
    return record.id;
  }

  static async update(record) {
    if (!record.id) {
      throw new Error('Todo has no ID');
    }
    record._validate();


    await pool.execute('UPDATE `todos` SET `text` = :text WHERE `id` = :id', {
      text: record.text,
      id: record.id,
    });
    console.log(`Todo item with ID ${record.id} has been updated`);
  }


  static async delete(record) {
    TodoRepository._checkRecord(record);
    if (!record.id) {
      throw new Error('Todo has no ID');
    }

    await pool.execute('DELETE FROM `todos` WHERE `id`=:id', {
      id: record.id,
    });
    console.log(`Todo item with this id: ${record.id} has been deleted`);
  }

  static async find(id) {
    const [result] = await pool.execute('SELECT * FROM `todos` WHERE `id`=:id', {
      id: id,
    });
    return result.length === 1 ? new ToDoRecord(result[0]) : _throw(new Error(`Id ${id} is not in database.`))
  }

  static async findAll() {
    const [results] = await pool.execute('SELECT * FROM `todos`');
    return results.map(result => new ToDoRecord(result));
  }
}

function _throw(m) {
  throw m;
}


module.exports = {
  TodoRepository
}
