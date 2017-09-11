import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import ArtistItem from './ArtistItem';

function setup(props) {
  return shallow(<ArtistItem {...props} />);
}

describe('ArtistItem', () => {
  it('renders ArtistItem when rendered by default', () => {
    const wrapper = setup({
      artist: {
        id: 'artistid1',
        name: 'Artist Test 1',
        images: [{ url: 'test1'}, { url: 'test2'}],
        followers: {
          total: 10000
        }
      },
      onArtistClick: () => {},
      onFollowClick: () => {}
    });

    expect(wrapper.find('Panel').length).toEqual(1);
    expect(wrapper.find('div.artist-image').length).toEqual(1);
    expect(wrapper.find('Image').length).toEqual(1);
    expect(wrapper.find('div.artist-info').length).toEqual(1);
    expect(wrapper.find('h3').text()).toEqual('Artist Test 1');
    expect(wrapper.find('div.artist-actions').length).toEqual(1);
  });
});
