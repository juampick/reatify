import expect from 'expect';
import initialState from './initialState';
import sessionReducer from './sessionReducer';
import * as sessionActions from '../actions/sessionActions';
import * as actionTypes from '../actions/actionTypes';

describe('Session Reducer', () => {
  describe('Session Reducer - Authorize', () => {
    it(`should work when passed ${actionTypes.AUTHORIZE_REQUEST}`, () => {
      const authorizeUrl = 'http://testUrl.com';
      // Arrange.
      const action = sessionActions.authorizeRequest(authorizeUrl);

      // Act.
      const newState = sessionReducer(initialState.auth, action);

      // Assert.
      expect(newState.authorizeUrl).toEqual(authorizeUrl);
    });
  });

  describe('Session Reducer - Login', () => {
    it(`should work when passed ${actionTypes.LOG_IN_SUCCESS}`, () => {
      // Arrange.
      const dateReceived = Date.now();
      const accessToken = '1723218736213213';
      const expiresIn = 3600;

      const action = sessionActions.loginSuccess(accessToken, expiresIn);

      // Act.
      const newState = sessionReducer(initialState.auth, action);

      // Assert.
      expect(newState.loggedIn).toBe(true);
      expect(newState.authorizeUrl).toBe(null);
      expect(newState.session.loggedAt).toBeGreaterThanOrEqualTo(dateReceived);
      expect(newState.error).toBe(false);
      expect(newState.errorMessage).toEqual(null);
      expect(newState.session.accessToken).toEqual(accessToken);
      expect(newState.session.expireIn).toEqual(expiresIn);
    });

    it(`should work when passed ${actionTypes.LOG_IN_ERROR}`, () => {
      // Arrange.
      const errorMessage = 'Login not ok';

      const action = sessionActions.loginError(errorMessage);

      // Act.
      const newState = sessionReducer(initialState.auth, action);

      // Assert.
      expect(newState.loggedIn).toBe(false);
      expect(newState.session.accessToken).toBe(null);
      expect(newState.error).toBe(true);
      expect(newState.errorMessage).toEqual(errorMessage);
    });

    it(`should work when passed ${actionTypes.LOG_IN_CHECK}`, () => {
      // Arrange.
      const dateReceived = Date.now();
      const accessToken = '1723218736213213';
      const expiresIn = 3600;

      const action = sessionActions.loginCheck(accessToken, expiresIn);

      // Act.
      const newState = sessionReducer(initialState.auth, action);

      // Assert.
      expect(newState.loggedIn).toBe(true);
      expect(newState.authorizeUrl).toBe(null);
      expect(newState.session.loggedAt).toBeGreaterThanOrEqualTo(dateReceived);
      expect(newState.error).toBe(false);
      expect(newState.errorMessage).toEqual(null);
      expect(newState.session.accessToken).toEqual(accessToken);
      expect(newState.session.expireIn).toEqual(expiresIn);
    });
  });

  describe('Session Reducer - Logout', () => {
    it(`should work when passed ${actionTypes.LOG_OUT_SUCCESS}`, () => {
      // Arrange.
      const action = sessionActions.logOutSuccess();

      // Act.
      const newState = sessionReducer(initialState.auth, action);

      // Assert.
      expect(newState.loggedIn).toBe(false);
      expect(newState.session.accessToken).toEqual(null);
    });
  });

  describe('Session Reducer - Session Expired', () => {
    it(`should work when passed ${actionTypes.SESSION_EXPIRED}`, () => {
      // Arrange.
      const dateExpired = Date.now();

      const action = sessionActions.sessionExpired();

      // Act.
      const newState = sessionReducer(initialState.auth, action);

      // Assert.
      expect(newState.sessionExpired.expired).toBe(true);
      expect(newState.sessionExpired.expiredAt).toBeGreaterThanOrEqualTo(dateExpired);
    });
  });
});
