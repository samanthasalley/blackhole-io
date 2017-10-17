const pg = require('pg');
const uri = 'postgres://zyfrobhu:NL5fpVCjHv9oTkrS-D_8Lz5yLK2kD8qY@stampy.db.elephantsql.com:5432/zyfrobhu';
const todoController = {};



// /api/todos output in the form of
/*
[
    "build stardust",
    "have a dance party"
]
*/
todoController.getTodoList = (req, res, next) => {
  let results;
  // Get a Postgres client from the connection pool
  pg.connect(uri, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM "Todo";');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results = row.item;
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}

todoController.postTodoList = (req, res, next) => {
  let results;
  const data = req.body.data;
  console.log(data);
  pg.connect(uri, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }

    client.query('UPDATE "Todo" SET item = ($2) WHERE _id=($1)',
      [1, data]);
    
    const query = client.query('SELECT * FROM "Todo";');
    query.on('row', (row) => {
      results = row;
    });
    query.on('end', function () {
      done();
      return res.json(results);
    });
  });
}

module.exports = todoController;