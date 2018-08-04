var socket = io();

var me;

function scrollToBottom () {
  var messages = jQuery('#message');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);
    if('name' in params){
      me = params.name;
      console.log("hehe");
      socket.emit('join', params, function (err) {
        if(err)  {
          alert(err);
          window.location.href = '/join';
        } else {
          console.log(err);
        }
      })
    }
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
})

socket.on('updateUserList', function (users) {
  console.log('Users list', users);
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    var li = jQuery('<li></li>');
    li.attr('class','user');
    li.text(user);
    ol.append(li);
  })
  jQuery('#users').html(ol);
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
  if(message.from === me) {
    li.attr('class','me');
    spanU.text(`You`);
  }
  p.text(`${message.text}`);
  li.append(spanU).append(spanT);
  li.append(p);
  jQuery('#message').append(li);

  scrollToBottom();

});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
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

  scrollToBottom();
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
