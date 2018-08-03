var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.on('newMessage', function(message) {
    console.log('Message',message);
  });

  socket.on('welcomeMsg', function(welcomeMsg) {
    console.log(welcomeMsg);
  })

  socket.on('joinMsg', function(joinMsg) {
    console.log(joinMsg);
  })
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
})
