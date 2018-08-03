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

var locationButton = $('#send-location');

socket.on('newLocationMessage', function(location) {
  var li = jQuery('<li></li>');
  var a = jQuery(`<a target="_blank">My current Location</a>`);
  li.text(`${location.from}: `);
  a.attr('href',location.url);
  jQuery('#message').append(li.append(a));
})

locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    socket.emit('getCurrentPosition',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  },function () {
    alert('Unable to fetch location');
  })
})
