import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import Footer from './Footer';

function setup(props) {
  return shallow(<Footer {...props} />);
}

describe('Footer', () => {
  it('renders Footer when rendered by default', () => {
    const wrapper = setup({});

    expect(wrapper.find('Grid').length).toEqual(1);
    expect(wrapper.find('footer').length).toEqual(1);
  });
});
