const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const routes = require('../routes/index');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const viewsPath = path.join(__dirname,'../views');
const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.set('views',viewsPath);
app.set('view engine','pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(publicPath));

app.use('/',routes);

io.on('connection', (socket) => {

  console.log('New user connected');

  socket.on('join',(params, callback) => {
    module.exports.params = params;
    if(!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required');
    }
    socket.join(params.room);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
    callback();
  })

  socket.on('createMessage', (message, callback) => {

    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    }

    callback();
  })

  socket.on('getCurrentPosition', (coords) => {
      var user = users.getUser(socket.id)
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  })

})


server.listen(port,(err) => {
  if(err)
    console.log(`Unable to listen to port ${3000}`);
  else
    console.log(`Server is listening to the port ${3000}`);
})
