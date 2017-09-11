import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {HomePage} from './HomePage';

function setup(props){
  return mount(<HomePage {...props} />);
}

describe('HomePage', () => {
  it('renders HomePage with Loading Spinner when isFetching from followingArtists is settled as true', () => {
    const wrapper = setup({
      artistsActions: {
        getFollowingArtists: () => {},
        getRelatedArtists: () => {}
      },
      followingArtists: {
        items: [],
        isFetching: true,
        error: false,
        errorMessage: ''
      },
      relatedArtists: {
        id: null,
        name: null,
        items: [],
        isFetching: false,
        error: false,
        errorMessage: ''
      }
    });

    expect(wrapper.find('LoadingSpinner').length).toEqual(1);
  });

  it('renders HomePage with Loading Spinner when isFetching from relatedArtists is settled as true', () => {
    const wrapper = setup({
      artistsActions: {
        getFollowingArtists: () => {},
        getRelatedArtists: () => {}
      },
      followingArtists: {
        items: [],
        isFetching: false,
        error: false,
        errorMessage: ''
      },
      relatedArtists: {
        id: null,
        name: null,
        items: [],
        isFetching: true,
        error: false,
        errorMessage: ''
      }
    });

    expect(wrapper.find('LoadingSpinner').length).toEqual(1);
  });

  it('renders HomePage with main components when rendered by default', () => {
    const wrapper = setup({
      artistsActions: {
        getFollowingArtists: () => {},
        getRelatedArtists: () => {}
      },
      followingArtists: {
        items: [],
        isFetching: false,
        error: false,
        errorMessage: ''
      },
      relatedArtists: {
        id: null,
        name: null,
        items: [],
        isFetching: false,
        error: false,
        errorMessage: ''
      }
    });

    expect(wrapper.find('Col').length).toEqual(1);
    expect(wrapper.find('ArtistsCarousel').length).toEqual(1);
    expect(wrapper.find('ArtistsGrid').length).toEqual(1);
  });

  it('renders HomePage with Related Artist selected when rendered by default', () => {
    const wrapper = setup({
      artistsActions: {
        getFollowingArtists: () => {},
        getRelatedArtists: () => {}
      },
      followingArtists: {
        items: [],
        isFetching: false,
        error: false,
        errorMessage: ''
      },
      relatedArtists: {
        id: '12345',
        name: 'Test Artist 1',
        items: [],
        isFetching: false,
        error: false,
        errorMessage: ''
      }
    });

    expect(wrapper.find('Row').length).toEqual(1);
    expect(wrapper.find('div.artist-selected').length).toEqual(1);
    expect(wrapper.find('div.seed').length).toEqual(1);
    expect(wrapper.find('Button').length).toEqual(1);
  });
});
