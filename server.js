const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser');
const app = express();
const socket = require('socket.io');
const pg = require('pg');
const connectionString = 'postgres://zyfrobhu:NL5fpVCjHv9oTkrS-D_8Lz5yLK2kD8qY@stampy.db.elephantsql.com:5432/zyfrobhu';


const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(express.static(__dirname + '/www'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// /api/todos output in the form of 
/*
[
    "build stardust",
    "have a dance party"
]
*/
app.get('/api/todos', (req, res, next) => {
  let results;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
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
});

app.post('/api/todos', (req, res, next) => {
  let results;
  const data = req.body.data;
  console.log(data);
  pg.connect(connectionString, (err, client, done) => {
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
});





// /api/cal output in the form of
/*
[
  {
      "_id": 1,
      "month": 10,
      "day": 1,
      "events": ""
  },
  {
      "_id": 2,
      "month": 10,
      "day": 2,
      "events": ""
  },
  [...]
]
*/
app.get('/api/cal', (req, res, next) => {
  const results = [];
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    const query = client.query('SELECT * FROM "Cal";');
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


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

app.get('/api/space', (req, res, next) => {
  let results;
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    const query = client.query('SELECT * FROM "Space";');
    query.on('row', (row) => {
      results = row;
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

// PUT /api/update/space
/*
Input Body: 
{
    coords_x = [1,2,3,4,5,...],
    coords_y = [1,2,3,4,5,...]
}
*/

app.post('/api/update/space', (req, res, next) => {
  let results;
  // const data = { coords_x: req.body.coords_x, coords_y: req.body.coords_y };
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query('UPDATE "Space" SET coord_x=($1), coord_y=($2) WHERE _id=($3)',
      [mouseXPosArray, mouseYPosArray, 1]);
    const query = client.query('SELECT * FROM "Space";');
    query.on('row', (row) => {
      results = row;
    });
    query.on('end', function () {
      done();
      return res.json(results);
    });
  });
});

// empty out space database
app.post('/api/clear/space', (req, res, next) => {
  let results;
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    client.query('UPDATE "Space" SET coord_x=($1), coord_y=($2) WHERE _id=($3)',
      [[], [], 1]);
    const query = client.query('SELECT * FROM "Space";');
    query.on('row', (row) => {
      results = row;
    });
    query.on('end', function () {
      done();
      return res.json(results);
    });
  });
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

// socket.io stuff
const io = socket(server);
const mouseXPosArray = [];
const mouseYPosArray = [];
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection: ' + socket.id); // logs when new window is opened
  
  socket.on('mouse', mouseMsg); // listens for any 'mouse' event
  // calls this when 'mouse' event is heard
  function mouseMsg(mousePosition) {
    socket.broadcast.emit('mouse', mousePosition);
    // console.log(mousePosition);
    mouseXPosArray.push(mousePosition[0]);
    mouseYPosArray.push(mousePosition[1]);
    console.log(mouseXPosArray, mouseYPosArray);
  }
}