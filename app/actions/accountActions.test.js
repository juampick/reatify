import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as endpoints from '../resources/apiEndpoints';
import * as types from './actionTypes';
import * as accountActions from './accountActions';
import * as testHelper from '../testHelper';
import {SPOTIFY_ACCESS_TOKEN, SPOTIFY_ACCOUNT_ME} from '../resources/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Account Actions', () => {
  afterEach(() => {
    testHelper.cleanNock();
  });

  describe('Account Actions - Get Account Data', () => {
    it(`should be able to dispatch ${types.ACCOUNT_ME_GET_REQUEST} and ${types.ACCOUNT_ME_GET_SUCCESS} when getAccountData() action is call with correct params`, () => {
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

      const store = mockStore({});

      // Act & assert.
      return store.dispatch(accountActions.getAccountData())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual({
            type: types.ACCOUNT_ME_GET_REQUEST,
          });
          expect(actions[1]).toEqual({
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
        });
    });

    it(`should be able to dispatch ${types.ACCOUNT_ME_GET_REQUEST}, ${types.ACCOUNT_ME_GET_ERROR} and ${types.SERVICE_ERROR} when getAccountData() action is call and server replies 500 error.`, () => {
      // Arrange.
      const accountResponseError = {
        message: 'Error 500'
      };

      testHelper.getAuthenticatedNock()
        .get(`/${endpoints.ME}`)
        .reply(500, {
          ...accountResponseError
        });

      const store = mockStore({});

      // Act & assert.
      return store.dispatch(accountActions.getAccountData())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual({
            type: types.ACCOUNT_ME_GET_REQUEST
          });
          expect(actions[1].type).toEqual(types.SERVICE_ERROR);
          expect(actions[2]).toEqual({
            type: types.ACCOUNT_ME_GET_ERROR,
            message: accountResponseError.message
          });
        });
    });
  });

  describe('Account Actions - Check and Set User State', () => {
    it(`should be able to dispatch ${types.ACCOUNT_ME_CHECK} when checkAndSetUserState() action is call with correct params`, () => {
      // Arrange.
      const user = {
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

      localStorage.setItem(SPOTIFY_ACCOUNT_ME, JSON.stringify(user));
      const store = mockStore({});

      // Act.
      store.dispatch(accountActions.checkAndSetUserState());

      // Assert.
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: types.ACCOUNT_ME_CHECK,
        user: user
      });
    });
  });
});
