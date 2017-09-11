import expect from 'expect';
import * as stringHelper from './stringHelper';

describe('StringHelper', () => {
  it('should generate random string hash when called generateRandomStringHash()', () => {
    // assert.
    expect(stringHelper.generateRandomStringHash()).toBeA('string');
  });
});
