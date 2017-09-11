import * as types from './actionTypes';
import accountService from '../services/accountService';
import {SPOTIFY_ACCOUNT_ME} from '../resources/constants';
import * as localStorageHelper from '../helpers/localStorageHelper';

export function accountMeRequest() {
  return {
    type: types.ACCOUNT_ME_GET_REQUEST
  };
}

export function accountMeSuccess(user) {
  return {
    type: types.ACCOUNT_ME_GET_SUCCESS,
    user
  };
}

export function accountMeError(message) {
  return {
    type: types.ACCOUNT_ME_GET_ERROR,
    message: message
  };
}

export function accountMeCheck(user) {
  return {
    type: types.ACCOUNT_ME_CHECK,
    user
  };
}

// Action Creators:

export function getAccountData() {
  return function (dispatch) {
    dispatch(accountMeRequest());
    return accountService.getAccountData(dispatch).then(response => {
      const id = response.id;
      const externalUrl = response.external_urls.spotify;
      const image = response.images && response.images[0].url;
      const email = response.email;
      const country = response.country;
      const product = response.product;
      const birthDate = response.birthdate;

      const user = {
        id,
        externalUrl,
        image,
        email,
        country,
        product,
        birthDate
      };

      localStorageHelper.set(SPOTIFY_ACCOUNT_ME, JSON.stringify(user));
      dispatch(accountMeSuccess(user));
    }).catch(error => {
      const message = error.payload.error.message ? error.payload.error.message : 'Unknown Error';
      dispatch(accountMeError(message));
    });
  };
}

export function checkAndSetUserState() {
  return function (dispatch) {
    const user = localStorageHelper.get(SPOTIFY_ACCOUNT_ME);
    if (!user) //ToDo: what happened if not set? logOut??
      return;

    const userParsed = JSON.parse(user);

    dispatch(accountMeCheck(userParsed));
  };
}
