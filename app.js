var express = require("express");
var app = express();
var path = require("path");
var mongoose = require("mongoose");
var api = require('./routes/api');
var menu = require('./routes/menu');
var posts = require('./routes/posts');
var comments = require('./routes/comments');
var users = require('./routes/users');
var categories = require('./routes/categories');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://pretenash:rappac33!@ds055865.mlab.com:55865/blog');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile(path.join('index.html'));
    //__dirname : It will resolve to your project folder.
});

app.use('/api', api);
app.use('/menu', menu);
app.use('/posts', posts);
app.use('/cat', categories);
app.use('/comm', comments);
app.use('/usr', users);


var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {

  socket.on('category:new', function(category) {
    io.emit('category:new', category);
  });
  socket.on('category:del', function(id) {
    io.emit('category:del', id);
  });
  socket.on('category:upd', function(updated){
      io.emit('category:upd', updated);
  });

  socket.on('post:new', function(post){
      io.emit('post:new', post);
  });

});

server.listen(7777);
console.log("Running at Port 7777");
