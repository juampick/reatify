import expect from 'expect';
import * as localStorageHelper from './localStorageHelper';

describe('LocalStorageHelper', () => {
  it('should set a value in the local storage when call to "set()" and get it using get()', () => {
    // arrange.
    const test = [
      {id: 1234},
      {name: 4321}
    ];

    // act.
    localStorage.setItem = expect.createSpy().andReturn(JSON.stringify(test));
    localStorage.getItem = expect.createSpy().andReturn(JSON.stringify(test));
    localStorage.removeItem = expect.createSpy().andReturn();

    localStorageHelper.set('testList', JSON.stringify(test));

    // assert.
    expect(localStorageHelper.getParsedItem('testList').length).toEqual(2);
  });
});

