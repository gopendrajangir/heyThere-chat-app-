const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'John',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Doe',
      room: 'React Course'
    },{
      id: '3',
      name: 'Mike',
      room: 'Node Course'
    }]
  })
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Andrew',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  })

  it('should remove a user', () => {
    var resUser = users.removeUser('1');
    expect(resUser.id).toBe('1');
    expect(users.users.length).toBe(2);
  })

  it('should not remove user', () => {
    var resUser = users.removeUser('5');
    expect(users.users.length).toBe(3);
  })

  it('should find user', () => {
    var userId = '1';
    var resUser = users.getUser(userId);
    expect(resUser.id).toBe('1');
  })

  it('should not find user', () => {
    var resUser = users.getUser('4');
    expect(resUser).toBe(undefined);
  })

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['John', 'Mike']);
  })
  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Doe']);
  })
})
