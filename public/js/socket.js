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
  var spanU = jQuery('<span></span>');
  spanU.attr('class','spanU');
  var spanT = jQuery('<span></span>');
  spanT.attr('class','spanT');
  var p = jQuery('<p></p>');
  p.attr('class','text');
  spanT.text(`${formattedTime}`);
  spanU.text(`${message.from}`);
  p.text(`${message.text}`);
  li.append(spanU).append(spanT);
  li.append(p);
  jQuery('#message').append(li);

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

  var formattedTime = moment(location.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var spanU = jQuery('<span></span>');
  spanU.attr('class','spanU');
  var spanT = jQuery('<span></span>');
  spanT.attr('class','spanT');
  var a = jQuery(`<a target="_blank">My current Location</a>`);
  a.attr('class','locationText');
  a.attr('href',location.url);
  spanT.text(`${formattedTime}`);
  spanU.text(`${location.from}`);
  li.append(spanU).append(spanT);
  li.append(a);
  jQuery('#message').append(li);
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
