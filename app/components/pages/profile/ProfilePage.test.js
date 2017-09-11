import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import {ProfilePage} from './ProfilePage';

function setup(props) {
  return shallow(<ProfilePage {...props} />);
}

describe('ProfilePage', () => {
  it('should render the wrapper container div, the Panel, etc when renders by default', () => {
    const wrapper = setup({
      user: {
        id: 'juampick',
        email: 'juampick@gmail.com',
        birthDate: '09-06-1988',
        country: 'AR',
        product: 'premium',
        image: 'http://urlImage.png'
      }
    });

    expect(wrapper.find('Col').exists()).toBe(true);
    expect(wrapper.find('PageHeader').length).toEqual(1);
    expect(wrapper.find('Panel').length).toEqual(1);
  });
});
