import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Header from './Header';

function setup(props) {
  return mount(<Header {...props} />);
}

describe('Header', () => {
  it('renders Navbar Header when rendered by default', () => {
    const wrapper = setup({
      loggedIn: false,
      onLogout: () => {},
      user: {}
    });

    expect(wrapper.find('Navbar').exists()).toBe(true);
  });

  it('renders Navbar Header and loggedSection when rendered logged', () => {
    const wrapper = setup({
      loggedIn: true,
      onLogout: () => {},
      user: {}
    });

    expect(wrapper.find('.logged-nav').exists()).toBe(true);
  });
});
