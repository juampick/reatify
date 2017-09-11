import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {HomePage} from './HomePage';

function setup(){
  return mount(<HomePage />);
}

describe('HomePage', () => {
  xit('renders homepage, h1 and subtitle', () => {
    const wrapper = setup({
      artistsActions: {
        getFollowingArtists: () => {},
        getRelatedArtists: () => {}
      },
      followingArtists: {
        isFetching: true
      },
      relatedArtists: {}
    });

    expect(wrapper.find('LoadingSpinner').length).toEqual(1);
  });
});
