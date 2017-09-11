import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import ArtistsCarousel from './ArtistsCarousel';

function setup(props) {
  return mount(<ArtistsCarousel {...props} />);
}

describe('ArtistsCarousel', () => {
  it('should not render anything if you dont have items', () => {
    const wrapper = setup({
      artists: {
        isFetching: false,
        items: []
      },
      onArtistClick: () => {},
      onFollowClick: () => {}
    });

    expect(wrapper.find('').exists()).toBe(false);
  });

  it('should renders ArtistsCarousel with Carousel.Item components when renders with items', () => {
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

    expect(wrapper.find('Carousel').length).toEqual(1);
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('h3').exists()).toBe(true);
  });
});
