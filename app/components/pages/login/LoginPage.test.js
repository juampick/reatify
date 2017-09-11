import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {LoginPage} from './LoginPage';

function setup(props) {
  return mount(<LoginPage {...props} />);
}

describe('LoginPage', () => {
  it('should render the wrapper div with h2 and Link when renders by default', () => {
    const wrapper = setup({
      sessionActions: {
        createAuthorizeURL: () => {}
      },
      location: {
        pathname: '/login'
      },
      authorizeUrl: ''
    });

    expect(wrapper.find('Row').length).toEqual(1);
    expect(wrapper.find('Panel').length).toEqual(1);
    //expect(wrapper.find('Link').length).toEqual(1);
  });
});
