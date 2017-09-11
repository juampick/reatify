import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import HomePage from './HomePage';

function setup(){
  return shallow(<HomePage />);
}

describe('HomePage', () => {
  xit('renders homepage, h1 and subtitle', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
  });
});
