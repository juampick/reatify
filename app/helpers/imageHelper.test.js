import expect from 'expect';
import * as imageHelper from './imageHelper';
import {IMAGE_COVER} from '../resources/constants';

describe('ImageHelper', () => {
  it('should retrieve the COVER, 1st image when called getImage()', () => {
    // arrange.
    const imageArray = [{url: '1'}, {url: '2'}, {url: '3'}];

    // assert.
    expect(imageHelper.getImage(imageArray, IMAGE_COVER)).toEqual({url:'1'})
  });
});
