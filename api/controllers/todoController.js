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
    const query = client.query('SELECT * FROM todo');
    // Stream results back one row at a time
    // query.on('row', (row) => {
    //   results = row.item;
    //   console.log(results);
    // });
    console.log('query', query);
    query.on("row", (row, result) =>{
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
  pg.connect(uri, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }

    const query = client.query("Insert into todo (item, item_type, date) values (($1), ($2), ($3)) returning _id",
      [req.body.data.name, req.body.data.type, req.body.data.date]);
    query.on('end', function (response) {
      done();
      return res.json({id:response.rows[0]._id});
    });
  });
}

module.exports = todoController;