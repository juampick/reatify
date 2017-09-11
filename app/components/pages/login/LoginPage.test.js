import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {LoginPage} from './LoginPage';

function setup(props) {
  return mount(<LoginPage {...props} />);
}

describe('LoginPage', () => {
  it('should render the wrapper component and sub components when renders by default', () => {
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
    expect(wrapper.find('Button').exists()).toBe(true);
  });

  it('should render sessionExpired message when renders with sessionExpired as true', () => {
    const wrapper = setup({
      sessionActions: {
        createAuthorizeURL: () => {}
      },
      location: {
        pathname: '/login'
      },
      authorizeUrl: '',
      sessionExpired: true
    });

    expect(wrapper.find('Alert').length).toEqual(true);
    expect(wrapper.find('h4').text()).toEqual('Session Expired');
  });
});
