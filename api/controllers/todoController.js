const pg = require('pg');
const uri = 'postgres://fyunilkq:qGcrNqw4vxpGRBkljsRNqyJ3hrH4x6aN@pellefant.db.elephantsql.com:5432/fyunilkq';
//postgres://fyunilkq:qGcrNqw4vxpGRBkljsRNqyJ3hrH4x6aN@pellefant.db.elephantsql.com:5432/fyunilkq
//postgres://zyfrobhu:NL5fpVCjHv9oTkrS-D_8Lz5yLK2kD8qY@stampy.db.elephantsql.com:5432/zyfrobhu
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
    const query = client.query('SELECT * FROM "todo";');
    // Stream results back one row at a time
    // query.on('row', (row) => {
    //   results = row.item;
    //   console.log(results);
    // });
    query.on("row", (row, result) => {
      result.addRow(row);
      console.log("test", result.rows[0].item);
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
  const data = req.body.data[0];
  pg.connect(uri, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }

    client.query("Insert into todo (item, item_type, date) values (($1), ($2), ($3))",
      [req.body.data[0].name, req.body.data[0].taskType, req.body.data[0].date]);

    //need the id of what was recently added
    const query = client.query('SELECT * FROM "todo" where _id = "";');
    query.on("row", (row, result) => {
      result.addRow(row);
    });
    query.on('end', function () {
      done();
      return res.json(results);
    });
  });
}

module.exports = todoController;