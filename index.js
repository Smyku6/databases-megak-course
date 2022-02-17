const mongo = require('mongodb');

const client = new mongo.MongoClient('mongodb://localhost:27017',
  {useNewUrlParser: true});


(async () => {

  await client.connect();
  const db = client.db('megak_music');
  const songs = db.collection('songs');
  const artists = db.collection('artists');

  console.log(songs.find());
  console.log('Baza połączona!');


  await client.close();

})();
