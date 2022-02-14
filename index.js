const mysql = require('mysql2/promise');

(async () => {

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'megak_cars',
    decimalNumbers: true,
    namedPlaceholders: true,
  })

  // console.log(connection);
  // await connection.end();

  const [results] = await connection.execute('SELECT * FROM `car` WHERE `price` > 100000');
  // console.log(results);


  // const answer = await connection.execute('UPDATE `car` SET `price` = `price`+10');
  // console.log(answer);

  // const answer = await connection.execute('UPDATE `car` SET `price` = `price`+10');
  // console.log(answer[0].affectedRows);

  // const {affectedRows} = (await connection.execute('UPDATE `car` SET `price` = `price`+10'))[0];
  // console.log(affectedRows);

  // const [{affectedRows}] = await connection.execute('UPDATE `car` SET `price` = `price`+10');
  // console.log(affectedRows);

  // const value = 10000;
  // const addedValue = 123;
  //
  // const [{
  //   affectedRows
  // }] = (await connection.execute('UPDATE `car` SET `price` = `price` + :addedValue WHERE `price` < :value', {
  //   addedValue, value
  // }))
  //
  // console.log(affectedRows);

  //
  // console.log([await connection.execute('SELECT * FROM `car` WHERE `price` < 20000')][0][0]);


  const cars = [
    {
      registrationNumber: 'SJZ7CC6',
      brand: 'Jaguar',
      model: 'X-Type',
      color: 'black',
      firstRegistrationAt: '2013-03-14',
      price: 125000,
    },
    {
      registrationNumber: 'GDA32423C',
      brand: 'Fiat',
      model: 'Punto',
      color: 'yellow',
      firstRegistrationAt: '2010-01-01',
      price: 1000,
    }
  ]

  // STATEMENT

  const addCarStatement = await connection.prepare('INSERT INTO `car` VALUES(?,?,?,?,?,?)');

  try {
    for (const car of cars) {
      await addCarStatement.execute(Object.values(car));
    }
    console.log('działa')
  } finally {
    addCarStatement.close();
  }


})();
