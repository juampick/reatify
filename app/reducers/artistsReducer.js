import update from 'immutability-helper';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export const artistsFollowing = (state = initialState.artists.following, action) => {
  switch (action.type) {
    case types.ARTISTS_FOLLOWING_GET_REQUEST:
      return Object.assign({}, state,
        {
          items: [],
          isFetching: true
        }
      );

    case types.ARTISTS_FOLLOWING_GET_SUCCESS:
      return Object.assign({}, state,
        {
          items: action.items,
          isFetching: false,
          receivedAt: Date.now(),
          error: false,
          errorMessage: null
        }
      );

    case types.ARTISTS_FOLLOWING_GET_ERROR:
      return Object.assign({}, state,
        {
          items: [],
          isFetching: false,
          receivedAt: null,
          error: true,
          errorMessage: action.message
        }
      );

    default:
      return state;
  }
};

export const artistsRelated = (state = initialState.artists.related, action) => {
  switch (action.type) {
    case types.ARTISTS_RELATED_GET_REQUEST:
      return Object.assign({}, state,
        {
          id: action.id,
          name: action.name,
          items: [],
          isFetching: true
        }
      );

    case types.ARTISTS_RELATED_GET_SUCCESS:
      return Object.assign({}, state,
        {
          id: action.id,
          items: action.items,
          name: state.name,
          isFetching: false,
          receivedAt: Date.now(),
          error: false,
          errorMessage: null
        }
      );

    case types.ARTISTS_RELATED_GET_ERROR:
      return Object.assign({}, state,
        {
          id: action.id,
          name: state.name,
          items: [],
          isFetching: false,
          receivedAt: null,
          error: true,
          errorMessage: action.message
        }
      );

    case types.ARTISTS_RELATED_RESET:
      return Object.assign({}, state,
        {
          id: null,
          name: null,
          items: [],
          isFetching: false,
          receivedAt: null,
          error: false,
          errorMessage: null
        }
      );

    case types.ARTISTS_FOLLOWING_UPDATE_REQUEST:
    case types.ARTISTS_FOLLOWING_DELETE_REQUEST: {
      const artistItemIndex = state.items.findIndex(artist => artist.id === action.id);
      if (artistItemIndex === -1) return state;

      return update(state, {
        items: {
          [artistItemIndex]: {
            $merge: {
              isUpdating: true
            }
          }
        }
      });
    }

    case types.ARTISTS_FOLLOWING_UPDATE_SUCCESS:
    case types.ARTISTS_FOLLOWING_DELETE_SUCCESS: {
      const artistItemIndex = state.items.findIndex(artist => artist.id === action.id);
      if (artistItemIndex === -1) return state;

      return update(state, {
        items: {
          [artistItemIndex]: {
            $merge: {
              followed: action.followed,
              isUpdating: false
            }
          }
        }
      });
    }

    case types.ARTISTS_FOLLOWING_UPDATE_ERROR:
    case types.ARTISTS_FOLLOWING_DELETE_ERROR: {
      const artistItemIndex = state.items.findIndex(artist => artist.id === action.id);
      if (artistItemIndex === -1) return state;

      return update(state, {
        items: {
          [artistItemIndex]: {
            $merge: {
              isUpdating: false,
              followed: state.items[artistItemIndex].followed
            }
          }
        }
      });
    }

    default:
      return state;
  }
};
