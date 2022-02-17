const {pool} = require("../utils/db");
const {v4: uuid} = require("uuid");

class ToDoRecord {

  constructor(obj) {
    this.id = obj.id;
    this.text = obj.text;

    this._validate();
  }

  _validate() {
    if (this.text.trim().length < 5) {
      throw new Error('To do text should be at least 5 characters.');
    }

    if (this.text.length > 150) {
      throw new Error('To do text should be at most 150 characters.')
    }
  }


}




module
  .exports = {
  ToDoRecord
}
