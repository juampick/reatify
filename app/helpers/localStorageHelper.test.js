import expect from 'expect';
import * as LocalStorageHelper from './localStorageHelper';

describe('LocalStorageHelper', () => {
  it('should set a value  in the local storage when call to "setItem()" and get it using getItem()', () => {
    // arrange.
    const cowsSearched = [
      {id: 1234},
      {id: 4321}
    ];

    // act.
    localStorage.setItem = expect.createSpy().andReturn(JSON.stringify(cowsSearched));
    localStorage.getItem = expect.createSpy().andReturn(JSON.stringify(cowsSearched));
    localStorage.removeItem = expect.createSpy().andReturn();

    LocalStorageHelper.set('testList', JSON.stringify(cowsSearched));

    // assert.
    expect(LocalStorageHelper.getParsedItem('testList').length).toEqual(2);
  });
});

