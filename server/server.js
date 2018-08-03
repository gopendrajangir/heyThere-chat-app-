const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const routes = require('../routes/index');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const viewsPath = path.join(__dirname,'../views');
const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.set('views',viewsPath);
app.set('view engine','pug');

app.use(express.static(publicPath));

app.use('/',routes);

io.on('connection', (socket) => {

  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('joinMsg',generateMessage("Admin","New user has joined the chat room"));

  socket.on('createMessage', (message, callback) => {

    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  })

  socket.on('getCurrentPosition', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('Disconnected to client');
  })

})


server.listen(port,(err) => {
  if(err)
    console.log(`Unable to listen to port ${3000}`);
  else
    console.log(`Server is listening to the port ${3000}`);
})
