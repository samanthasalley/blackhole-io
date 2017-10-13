const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser');
const app = express();
const socket = require('socket.io');


// var mongoose = require('mongoose');
// var mongoDB = 'mongodb://admin:password@ds115045.mlab.com:15045/todo';
// mongoose.connect(mongoDB, {
//   useMongoClient: true
// });
// var db = mongoose.connection;
// db.on('connected', function () { console.log('Mongoose default connection open to ' + 'mlab');}); 
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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

// app.get('/', (req, res) => {

// });

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

// socket.io stuff
const io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection: ' + socket.id);
  socket.on('mouse', mouseMsg);

  function mouseMsg(mousePosition) {
    socket.broadcast.emit('mouse', mousePosition);
    console.log(mousePosition);
  }
}