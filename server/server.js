const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const routes = require('../routes/index');

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

  socket.emit('newMessage',{
    from: 'gopendra',
    text: "What's up everyone",
    createdAt: new Date()
  })

  socket.on('createMessage', (createdMessage) => {
    console.log('Message',createdMessage);
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
