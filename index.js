const mysql = require('mysql2/promise');
const {v4: uuid} = require('uuid');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'megak_students',
  namedPlaceholders: true,
  decimalNumbers: true,
  bigNumberStrings: false
});

(async () => {

  console.log('--- EXERCISE 1 ---')
  const [results] = await pool.execute('SELECT * FROM `course`');
  console.log(results)

  console.log('--- EXERCISE 2 ---')
  const [student_course] = await pool.execute('SELECT `student`.`id`, `student`.`name`,' +
    ' `student`.`surname`,' +
    ' `student_course`.`courseName`' +
    ' FROM' +
    ' `student` JOIN `student_course` ON `student`.`id` = `student_course`.`studentId` WHERE`age`' +
    ' > 40');
  console.log(student_course)

  console.log('--- EXERCISE 3 ---')
  const {affectedRows: deletedStudentsUnderGivenAge} = (await pool.execute('DELETE FROM' +
    ' `student` WHERE' +
    ' `age` < :age', {age: 18}))[0];
  console.log(deletedStudentsUnderGivenAge);

  console.log('--- EXERCISE 4 ---')
  const newStudentId = uuid();
  await pool.execute('INSERT INTO `student`(`id`, `name`,`surname`,`age`,' +
    ' `city`)' +
    ' VALUES(:id, :name, :surname,' +
    ' :age, :city);', {
    id: newStudentId,
    name: 'Janusz', surname: 'Gortat', age: 85, city: 'Wrocław'
  });
  console.log(newStudentId);

  await pool.end();
})();
