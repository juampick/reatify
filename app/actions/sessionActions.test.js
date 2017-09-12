import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as endpoints from '../resources/apiEndpoints';
import * as types from './actionTypes';
import * as sessionActions from './sessionActions';
import * as testHelper from '../testHelper';
import {SPOTIFY_ACCESS_TOKEN, SPOTIFY_EXPIRES_IN, SPOTIFY_STATE_HASH} from '../resources/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Session Actions', () => {
  afterEach(() => {
    testHelper.cleanNock();
  });

  describe('Session Actions - Authorize', () => {
    it(`should be able to dispatch ${types.AUTHORIZE_REQUEST} when createAuthorizeURL() action is call`, () => {
      // Arrange.
      const store = mockStore({});

      // Act & assert.
      store.dispatch(sessionActions.createAuthorizeURL());
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.AUTHORIZE_REQUEST);
      expect(actions[0].authorizeUrl).toBeA('string');
    });
  });

  describe('Session Actions - Check Callback response', () => {
    it(`should be able to dispatch ${types.ACCOUNT_ME_GET_REQUEST}, ${types.ACCOUNT_ME_GET_SUCCESS} and ${types.LOG_IN_SUCCESS} when checkCallbackResponse() action is call with correct params`, () => {
      // Arrange.
      const accountResponse = {
        id: 1,
        email: 'juampick@gmail.com',
        country: 'AR',
        product: 'premium',
        birthdate: '09/06/1988',
        external_urls: {
          spotify: 'https://open.spotify.com/user/juampick',
        },
        images: ['']
      };

      testHelper.getAuthenticatedNock()
        .get(`/${endpoints.ME}`)
        .reply(200, {
          ...accountResponse
        });

      localStorage.setItem(SPOTIFY_ACCESS_TOKEN, testHelper.token);
      localStorage.setItem(SPOTIFY_STATE_HASH, '23232321124efdsf');

      const hashParams = {
        access_token: testHelper.token,
        expires_in: 3600
      };
      const queryParams = {};

      const store = mockStore({});

      // Act & assert.
      return store.dispatch(sessionActions.checkCallbackResponse(hashParams, queryParams))
        .then(() => {
          const actions = store.getActions();
          expect(actions[1]).toEqual({
            type: types.ACCOUNT_ME_GET_REQUEST,
          });
          expect(actions[2]).toEqual({
            type: types.ACCOUNT_ME_GET_SUCCESS,
            user: {
              id: accountResponse.id,
              externalUrl: accountResponse.external_urls.spotify,
              image: accountResponse.images[0],
              email: accountResponse.email,
              country: accountResponse.country,
              product: accountResponse.product,
              birthDate: accountResponse.birthdate
            }
          });
          expect(actions[3]).toEqual({
            type: types.LOG_IN_SUCCESS,
            accessToken: testHelper.token,
            expiresIn: 3600
          });
        });
    });
  });

  describe('Account Actions - Check and Set Session State', () => {
    it(`should be able to dispatch ${types.LOG_IN_CHECK} when checkAndSetSessionState() action is call`, () => {
      // Arrange.
      const store = mockStore({});

      localStorage.setItem(SPOTIFY_ACCESS_TOKEN, testHelper.token);
      localStorage.setItem(SPOTIFY_EXPIRES_IN, "3600");

      // Act.
      store.dispatch(sessionActions.checkAndSetSessionState());

      // Assert.
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: types.LOG_IN_CHECK,
        accessToken: testHelper.token,
        expiresIn: "3600"
      });
    });
  });

  describe('Account Actions - LogOut', () => {
    it(`should be able to dispatch ${types.LOG_OUT_SUCCESS} when logOut() action is call`, () => {
      // Arrange.
      const store = mockStore({});

      // Act.
      store.dispatch(sessionActions.logOut());

      // Assert.
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: types.LOG_OUT_SUCCESS
      });
    });
  });

  describe('Account Actions - Session Expired', () => {
    it(`should be able to dispatch ${types.SESSION_EXPIRED} when sessionExpiredAction() action is call`, () => {
      // Arrange.
      const store = mockStore({});

      // Act.
      store.dispatch(sessionActions.sessionExpiredAction());

      // Assert.
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: types.SESSION_EXPIRED
      });
    });
  });
});

