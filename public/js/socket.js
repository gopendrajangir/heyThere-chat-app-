var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.on('joinMsg', function(joinMsg) {
    console.log(joinMsg);
  })

});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
})

socket.on('newMessage', function(message) {

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#message').append(li);

});


$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  },function () {

  })
})
