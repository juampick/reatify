import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import LoadingSpinner from './LoadingSpinner';

function setup(props) {
  return shallow(<LoadingSpinner {...props} />);
}

describe('LoadingSpinner', () => {
  xit('renders successfully', () => {
    const wrapper = setup({});

    expect(wrapper.find('ReactLoading').exists()).toBe(true);
  });
});
