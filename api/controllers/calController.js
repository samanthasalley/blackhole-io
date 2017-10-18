const pg = require('pg');
const uri = 'postgres://fyunilkq:qGcrNqw4vxpGRBkljsRNqyJ3hrH4x6aN@pellefant.db.elephantsql.com:5432/fyunilkq';
const calController = {};

// /api/cal output in the form of
/*
[
{
"_id": 1,
"start": "YYYY-MM-DD",
"end": "YYYY-MM-DD", - accepts nulls
"title": ""
},
{
"_id": 2,
"start": "YYYY-MM-DD",
"end": "YYYY-MM-DD", - accepts nulls
"title": ""
},
[...]
]
*/

calController.getCalEvents = (req, res, next) => {
  pg.connect(uri, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    const query = client.query('SELECT * FROM cal;');
    const results = query._result.rows;
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}

calController.addCalEvent = (req, res, next) => {
  const start = req.body.start;
  const title = req.body.title;
  console.log("REQUEST BODY start: ", start, "title: ", title)
  pg.connect(uri, (err, client, done) => {
    if (err) {
      done();
      console.log("Error: ", err);
      return res.status(500).json({ success: false, data: err });
    }
    const query = client.query(`INSERT INTO cal (start, title) VALUES ('${start}', '${title}');`);
    query.on('end', () => {
      done();
      return res.json(query);
    });
  });
}


module.exports = calController;
