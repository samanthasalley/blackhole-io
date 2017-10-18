const pg = require('pg');
const uri = 'postgres://zyfrobhu:NL5fpVCjHv9oTkrS-D_8Lz5yLK2kD8qY@stampy.db.elephantsql.com:5432/zyfrobhu';
const db = {};

pg.connect(uri, (err, client, done) => {
  if (err)  {
    console.log('Error Connecting to Database..');
    throw new Error(err);
  }
  db.conn = client;
  console.log('Connected to Database..')
});

module.exports = db;