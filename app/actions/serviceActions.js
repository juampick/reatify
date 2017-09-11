import * as types from './actionTypes';
import {logOut, sessionExpiredAction} from './sessionActions';

export function serviceError(error) {
  return {
    type: types.SERVICE_ERROR,
    error: error
  };
}

export function handleServiceError(error) {
  return function (dispatch) {
    switch (error.code) {
      case 401: {
        dispatch(serviceError());
        dispatch(logOut());
        dispatch(sessionExpiredAction());
        break;
      }
      case 403: {
        dispatch(serviceError(error));
        dispatch(logOut()); //dispatch logOut that will cleanLocalStorage, execute logout endpoint, and redirect to login.
        break;
      }
      default: {
        dispatch(serviceError(error));
      }
    }
  };
}
