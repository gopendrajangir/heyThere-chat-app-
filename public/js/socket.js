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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var span = jQuery('<span></span>');
  span.text(`${formattedTime}`);
  li.text(`${message.from}: ${message.text}`);
  jQuery('#message').append(li.append(span));

});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  },function () {
    messageTextbox.val('');
  })
})

socket.on('newLocationMessage', function(location) {
  var li = jQuery('<li></li>');
  var a = jQuery(`<a target="_blank">My current Location</a>`);
  li.text(`${location.from}: `);
  a.attr('href',location.url);
  jQuery('#message').append(li.append(a));
})

var locationButton = $('#send-location');

locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled','disabled').text('Sending location ...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('getCurrentPosition',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  },function () {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  })
})
