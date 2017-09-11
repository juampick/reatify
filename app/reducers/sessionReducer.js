import * as types from '../actions/actionTypes';
import initialState from './initialState';

const sessionReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTHORIZE_REQUEST:
      return Object.assign({}, state,
        {
          authorizeUrl: action.authorizeUrl
        }
      );

    case types.LOG_IN_SUCCESS:
      return Object.assign({}, state,
        {
          loggedIn: true,
          error: false,
          errorMessage: null,
          authorizeUrl: null,
          session: {
            accessToken: action.accessToken,
            expireIn: action.expiresIn,
            loggedAt: Date.now(),
            user: {
              id: null,
              name: null,
              displayName: null,
              email: null
            }
          }
        }
      );

    case types.LOG_IN_ERROR:
      return Object.assign({}, state,
        {
          loggedIn: false,
          error: true,
          errorMessage: action.message,
          session: {
            accessToken: null
          }
        }
      );

    case types.LOG_IN_CHECK:
      return Object.assign({}, state,
        {
          loggedIn: true,
          error: false,
          errorMessage: null,
          authorizeUrl: null,
          session: {
            accessToken: action.accessToken,
            expireIn: action.expiresIn,
            loggedAt: Date.now(),
            user: {
              id: null,
              name: null,
              displayName: null,
              email: null
            }
          }
        }
      );

    case types.LOG_OUT_SUCCESS:
      return Object.assign({}, state,
        {
          loggedIn: false,
          session: {
            accessToken: null,
            expireIn: null,
            loggedAt: null,
            user: {
              id: null,
              name: null,
              displayName: null,
              email: null
            }
          }
        }
      );

    case types.SESSION_EXPIRED:
      return Object.assign({}, state,
        {
          sessionExpired: {
            expired: true,
            expiredAt: Date.now()
          }
        }
      );

    default:
      return state;
  }
};

export default sessionReducer;
