const pg = require('pg');
const uri = 'postgres://fyunilkq:qGcrNqw4vxpGRBkljsRNqyJ3hrH4x6aN@pellefant.db.elephantsql.com:5432/fyunilkq';
const spaceController = {};


// /api/space output in the form of
/*
{
  "_id": 1,
  "coord_x": [
      50,
      51
  ],
  "coord_y": [
      52,
      54
  ]
}
*/

spaceController.getCanvasCoordinates = (req, res, next) => {
  let results;
  pg.connect(uri, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    const query = client.query('SELECT * FROM space;');
    query.on('row', (row) => {
      results = row;
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}

// PUT /api/update/space
/*
Input Body:
{
    coords_x = [1,2,3,4,5,...],
    coords_y = [1,2,3,4,5,...]
}
*/

spaceController.updateCanvasCoordinates = (req, res, next) => {
  let results;
  // const data = { coords_x: req.body.coords_x, coords_y: req.body.coords_y };
  pg.connect(uri, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query('UPDATE "Space" SET coord_x=($1), coord_y=($2) WHERE _id=($3)',
      [mouseXPosArray, mouseYPosArray, 1]);
    const query = client.query('SELECT * FROM space;');
    query.on('row', (row) => {
      results = row;
    });
    query.on('end', function () {
      done();
      return res.json(results);
    });
  });
}

// empty out space database
spaceController.clearCanvasCoordinates = (req, res, next) => {
  let results;
  pg.connect(uri, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query('UPDATE "Space" SET coord_x=($1), coord_y=($2) WHERE _id=($3)',
      [[], [], 1]);
    mouseXPosArray = [];
    mouseYPosArray = [];
    const query = client.query('SELECT * FROM space;');
    query.on('row', (row) => {
      results = row;
    });
    query.on('end', function () {
      done();
      return res.json(results);
    });
  });
}


module.exports = spaceController;
