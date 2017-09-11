import {push} from 'react-router-redux';
import * as types from './actionTypes';
import {isEmpty} from 'lodash';
import {getAccountData} from './accountActions';
import * as localStorageHelper from '../helpers/localStorageHelper';
import {generateURL} from '../helpers/urlHelper';
import {generateRandomStringHash} from '../helpers/stringHelper';
import {AUTHORIZE, SPOTIFY_ACCESS_TOKEN, SPOTIFY_EXPIRES_IN, SPOTIFY_STATE_HASH, SPOTIFY_TOKEN_TYPE, SPOTIFY_ACCOUNT_ME, TOKEN, RELATED_ARTIST_SELECTED} from '../resources/constants';
import * as apiEndpoints from '../resources/apiEndpoints';

export function authorizeRequest(authorizeUrl) {
  return {
    type: types.AUTHORIZE_REQUEST,
    authorizeUrl
  };
}

export function loginSuccess(accessToken, tokenType, expiresIn) {
  return {
    type: types.LOG_IN_SUCCESS,
    accessToken,
    tokenType,
    expiresIn
  };
}

export function loginError(message) {
  return {
    type: types.LOG_IN_ERROR,
    message
  };
}

export function loginCheck(accessToken, tokenType, expiresIn) {
  return {
    type: types.LOG_IN_CHECK,
    accessToken,
    tokenType,
    expiresIn
  };
}

export function logOutSuccess() {
  return {
    type: types.LOG_OUT_SUCCESS
  };
}

export function sessionExpired() {
  return {
    type: types.SESSION_EXPIRED
  };
}

// Action Creators

export function createAuthorizeURL() {
  return function (dispatch) {
    const callbackURI = `${process.env.BASE_APP}callback`; //ToDo: move process.env.BASE_APP to other place

    const stateHash = generateRandomStringHash();
    const scopes = 'user-read-private user-read-email user-read-birthdate user-top-read user-follow-read user-follow-modify';
    const params = {
      client_id: process.env.CLIENT_ID,
      response_type: TOKEN,
      redirect_uri: callbackURI,
      state: stateHash,
      scope: scopes
    };

    localStorageHelper.set(SPOTIFY_STATE_HASH, stateHash);

    const url = generateURL(apiEndpoints.SPOTIFY_WEB_API_AUTH_HOST, AUTHORIZE, params);

    dispatch(authorizeRequest(url));
  };
}

export function checkCallbackResponse(hashParams, queryParams) {
  return function (dispatch) {
    if (!isEmpty(queryParams)) { //Check for errors
      dispatch(loginError('Access Denied. You are not allowed to see this.'));
      dispatch(push('/error'));
      return;
    }

    if (hashParams.state &&
      hashParams.state !== localStorageHelper.get(SPOTIFY_STATE_HASH)) {
      dispatch(loginError('Access Denied. You are not allowed to see this.'));
      dispatch(push('/error'));
      return;
    }

    //Normal-Happy Path
    const accessToken = hashParams.access_token;
    const tokenType = hashParams.token_type;
    const expiresIn = hashParams.expires_in;

    //Also we may need to store this on the react state i think so...
    localStorageHelper.set(SPOTIFY_ACCESS_TOKEN, accessToken);
    localStorageHelper.set(SPOTIFY_TOKEN_TYPE, tokenType);
    localStorageHelper.set(SPOTIFY_EXPIRES_IN, expiresIn);
    localStorageHelper.remove(SPOTIFY_STATE_HASH);

    dispatch(push('/'));

    dispatch(getAccountData()) //We ask for the user data
      .then(() => {
        dispatch(loginSuccess(accessToken, tokenType, expiresIn));
      });
  };
}

export function checkAndSetSessionState() {
  return function (dispatch) {
    const accessToken = localStorageHelper.get(SPOTIFY_ACCESS_TOKEN);
    const tokenType = localStorageHelper.get(SPOTIFY_TOKEN_TYPE);
    const expiresIn = localStorageHelper.get(SPOTIFY_EXPIRES_IN);
    if (!accessToken || !tokenType || !expiresIn) {
      return;
    }

    dispatch(loginCheck(accessToken, tokenType, expiresIn));
  };
}

export function logOut() {
  return function (dispatch) {

    cleanupLocalStorage();

    dispatch(push('/login')); //Redirecting state to login

    dispatch(logOutSuccess());
  };
}

export function sessionExpiredAction() {
  return function (dispatch) {
    dispatch(sessionExpired());
  };
}

function cleanupLocalStorage() {
  localStorageHelper.remove(SPOTIFY_ACCESS_TOKEN);
  localStorageHelper.remove(SPOTIFY_TOKEN_TYPE);
  localStorageHelper.remove(SPOTIFY_STATE_HASH);
  localStorageHelper.remove(SPOTIFY_EXPIRES_IN);
  localStorageHelper.remove(SPOTIFY_ACCOUNT_ME);
  localStorageHelper.remove(RELATED_ARTIST_SELECTED);
}
