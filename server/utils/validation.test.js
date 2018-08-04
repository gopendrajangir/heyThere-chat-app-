const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non string value', () => {
    var realString = isRealString(98);
    expect(realString).toBe(false);
  });
  it('should reject string with only spaces', () => {
    var realString = isRealString('   ');
    expect(realString).toBe(false);
  });
  it('should allow string with non-space characters', () => {
    var realString = isRealString('gopendra');
    expect(realString).toBe(true);
  });
})
