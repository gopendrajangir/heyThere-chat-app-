var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.on('newMessage', function(message) {
    console.log('Message',message);
  });

  socket.emit('createMessage', {
    from:'Yogesh',
    text:"I'm good"
  })
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
})
