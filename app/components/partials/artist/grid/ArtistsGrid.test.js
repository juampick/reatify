import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import ArtistsGrid from './ArtistsGrid';

function setup(props) {
  return mount(<ArtistsGrid {...props} />);
}

describe('ArtistsGrid', () => {
  it('renders ArtistsGrid Alert component with no following artist', () => {
    const wrapper = setup({
      artists: {
        isFetching: false,
        items: []
      },
      onArtistClick: () => {},
      onFollowClick: () => {}
    });

    expect(wrapper.find('Alert').text()).toEqual('You are not following artists. You need to follow at least 1. Please try again.');
  });

  it('renders ArtistsGrid with ArtistItem components when rendered with artists', () => {
    const wrapper = setup({
      artists: {
        isFetching: false,
        items: [
          {
            id: 'aaatest',
            name: 'Artist Test 1',
            images: [{ url: 'test1'}, { url: 'test2'}]
          },
          {
            id: 'bbbtest',
            name: 'Artist Test 2',
            images: [{ url: 'test1'}, { url: 'test2'}]
          }
        ]
      },
      onArtistClick: () => {},
      onFollowClick: () => {}
    });

    expect(wrapper.find('Col').length).toEqual(2);
    expect(wrapper.find('ArtistItem').length).toEqual(2);
  });
});
