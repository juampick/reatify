import expect from 'expect';
import * as urlHelper from './urlHelper';

describe('UrlHelper', () => {
  it('should generate a url with queryString params when called generateURL() with correct parameters', () => {
    // arrange.
    const baseUrl = 'http://hello.com/';
    const url = 'test';
    const params = {
      test1: 1,
      test2: 2
    };

    // assert.
    expect(urlHelper.generateURL(baseUrl, url, params)).toEqual('http://hello.com/test?test1=1&test2=2');
  });
});

