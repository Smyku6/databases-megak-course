const {pool} = require("./utils/db");
const {ToDoRecord} = require("./records/todo.record");
const {TodoRepository} = require("./repositories/todo.repository");


(async () => {

  // const found = await TodoRepository.find('98941a1a-ff57-4056-9ef4-6d97a2978fe6');
  //
  // await TodoRepository.update(found);


  // await TodoRepository.insert(new ToDoRecord({id:'guwno', text: 'no i co działa czy nie '}))

  const guwno = await TodoRepository.find('guwno');
  console.log(await guwno);
  guwno.text = 'ZMIANY ZMIANY ZMIANY FLET';
  await TodoRepository.update(guwno);
  await pool.end();

})();

