import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import {ErrorPage} from './ErrorPage';

function setup(props) {
  return shallow(<ErrorPage {...props} />);
}

describe('ErrorPage', () => {
  it('should render error page with wrapper header title when renders by default with error settled as true', () => {
    const wrapper = setup({
      error: true,
      errorMessage: 'Unknown Error'
    });

    const props = wrapper.instance().props;

    expect(wrapper.find('div.error').length).toBe(1);
    expect(wrapper.find('div.error').children().find('h1').text()).toEqual('Error');
    expect(wrapper.find('div.alert').text()).toEqual(props['errorMessage']);
    expect(wrapper.find('Link').exists()).toBe(true);
  });

  it('should not render anything when renders without error flag', () => {
    const wrapper = setup({
      error: false
    });

    expect(wrapper.find('').exists()).toBe(false);
  });
});
