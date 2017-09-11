import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

function setup(props) {
  return shallow(<NotFound {...props} />);
}

describe('NotFound', () => {
  it('should render the wrapper div with h2 and Link when renders by default', () => {
    const wrapper = setup();

    expect(wrapper.find('div').first().length).toEqual(1);
    expect(wrapper.find('h2').text()).toEqual('404 Not Found');
    expect(wrapper.find('Link').length).toEqual(1);
  });
});
