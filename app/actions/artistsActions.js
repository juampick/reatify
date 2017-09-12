import update from 'immutability-helper';
import * as types from './actionTypes';
import artistsService from '../services/artistsService';
import {ARTISTS_FOLLOWING_LIMIT, RELATED_ARTIST_SELECTED} from '../resources/constants';
import * as localStorageHelper from '../helpers/localStorageHelper';

//Actions
export function artistsFollowingGetRequest() {
  return {
    type: types.ARTISTS_FOLLOWING_GET_REQUEST
  };
}

export function artistsFollowingGetSuccess(items) {
  return {
    type: types.ARTISTS_FOLLOWING_GET_SUCCESS,
    items
  };
}

export function artistsFollowingGetError(message) {
  return {
    type: types.ARTISTS_FOLLOWING_GET_ERROR,
    message
  };
}

export function artistsRelatedGetRequest(id, name) {
  return {
    type: types.ARTISTS_RELATED_GET_REQUEST,
    id,
    name
  };
}

export function artistsRelatedGetSuccess(id, items) {
  return {
    type: types.ARTISTS_RELATED_GET_SUCCESS,
    id,
    items
  };
}

export function artistsRelatedGetError(id, message) {
  return {
    type: types.ARTISTS_RELATED_GET_ERROR,
    id,
    message
  };
}

export function artistsRelatedReset() {
  return {
    type: types.ARTISTS_RELATED_RESET
  };
}

export function artistsFollowingUpdateRequest(id) {
  return {
    type: types.ARTISTS_FOLLOWING_UPDATE_REQUEST,
    id
  };
}

export function artistsFollowingUpdateSuccess(id) {
  return {
    type: types.ARTISTS_FOLLOWING_UPDATE_SUCCESS,
    id,
    followed: true
  };
}

export function artistsFollowingUpdateError(id, message) {
  return {
    type: types.ARTISTS_FOLLOWING_UPDATE_ERROR,
    id,
    message
  };
}

export function artistsFollowingDeleteRequest(id) {
  return {
    type: types.ARTISTS_FOLLOWING_DELETE_REQUEST,
    id
  };
}

export function artistsFollowingDeleteSuccess(id) {
  return {
    type: types.ARTISTS_FOLLOWING_DELETE_SUCCESS,
    id,
    followed: false
  };
}

export function artistsFollowingDeleteError(id, message) {
  return {
    type: types.ARTISTS_FOLLOWING_DELETE_ERROR,
    id,
    message
  };
}

// Action Creators:

export function getFollowingArtists() {
  return function (dispatch) {

    if (localStorageHelper.get(RELATED_ARTIST_SELECTED)) {
      const artistSelected = localStorageHelper.getParsedItem(RELATED_ARTIST_SELECTED);
      if (artistSelected && artistSelected.id && artistSelected.name){
        dispatch(getRelatedArtists(artistSelected.id, artistSelected.name));
      }
      return;
    }

    dispatch(artistsFollowingGetRequest());

    return artistsService.getFollowingArtists(dispatch, ARTISTS_FOLLOWING_LIMIT).then(response => {
      dispatch(artistsFollowingGetSuccess(response.artists.items));
    }).catch(() => {
      dispatch(artistsFollowingGetError('Unknown Error'));
    });
  };
}

export function getRelatedArtists(id, name) {
  return function (dispatch) {
    dispatch(artistsRelatedGetRequest(id, name));

    return artistsService.getRelatedArtists(dispatch, id).then(response => {

      const originalArtistsArray = response.artists;
      let artistsIdsArray = [];
      originalArtistsArray.map(artist => { //Loop over the items
        artistsIdsArray = artistsIdsArray.concat(artist.id); //Flatten/Concat items array into the array of items with only the id
      });
      const artistIdsString = artistsIdsArray.join(','); //We convert the array to string based, comma separated:

      let artists = [];

      return artistsService.checkUserIsFollowingArtists(dispatch, artistIdsString).then(response => {
        originalArtistsArray.map((artist, key) => {
          const updatedArtist = update(artist, {
            $merge: {
              followed: response[key]
            }
          });
          artists.push(updatedArtist);
        });

        dispatch(artistsRelatedGetSuccess(id, artists));

        //Also storing the selected artist on the localStorage.
        localStorageHelper.set(RELATED_ARTIST_SELECTED, JSON.stringify({id: id, name: name}));
      });
    }).catch(() => {
      dispatch(artistsRelatedGetError(id, 'Unknown Error'));
    });
  };
}

export function resetRelatedArtists() {
  return function (dispatch) {
    dispatch(artistsRelatedReset()); //Reset the related artists
    localStorageHelper.remove(RELATED_ARTIST_SELECTED);
    dispatch(getFollowingArtists()); //Request again
  };
}

export function updateFollowArtist(id, follow) {
  return function (dispatch) {
    if (follow) { //Follow artist:
      dispatch(artistsFollowingUpdateRequest(id));
      return artistsService.followArtist(dispatch, id).then(() => {
        dispatch(artistsFollowingUpdateSuccess(id));
      }).catch(() => {
        dispatch(artistsFollowingUpdateError(id, 'Unknown Error'));
      });
    } else { //UnFollow artist:
      dispatch(artistsFollowingDeleteRequest(id));
      return artistsService.unFollowArtist(dispatch, id).then(() => {
        dispatch(artistsFollowingDeleteSuccess(id));
      }).catch(() => {
        dispatch(artistsFollowingDeleteError(id, 'Unknown Error'));
      });
    }
  };
}
