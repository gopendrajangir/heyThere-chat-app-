var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
  })
});

describe('generateLocationMessage', () => {
  it('should generate location correct message object', () => {
    var from = 'Admin';
    var latitude = 1;
    var longitude = 1;
    var url = `https://www.google.com/maps?q=1,1`;
    var locationMessage = generateLocationMessage(from, latitude, longitude);

    expect(locationMessage.from).toBe("Admin");
    expect(locationMessage).toMatchObject({from, url});
  })
})
