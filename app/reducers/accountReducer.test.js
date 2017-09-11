import expect from 'expect';
import initialState from './initialState';
import accountReducer from './accountReducer';
import * as accountActions from '../actions/accountActions';
import * as actionTypes from '../actions/actionTypes';

describe('Account Reducer', () => {
  describe('Account Reducer - Get Account Data', () => {
    it(`should work when passed ${actionTypes.ACCOUNT_ME_GET_REQUEST}`, () => {
      // Arrange.
      const action = accountActions.accountMeRequest();

      // Act.
      const newState = accountReducer(initialState.user, action);

      // Assert.
      expect(newState.isFetching).toBe(true);
    });

    it(`should work when passed ${actionTypes.ACCOUNT_ME_GET_SUCCESS}`, () => {
      // Arrange.
      const dateReceived = Date.now();
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

      const action = accountActions.accountMeSuccess(user);

      // Act.
      const newState = accountReducer(initialState.user, action);

      // Assert.
      expect(newState.data).toEqual(user);
      expect(newState.isFetching).toBe(false);
      expect(newState.receivedAt).toBeGreaterThanOrEqualTo(dateReceived);
      expect(newState.error).toBe(false);
      expect(newState.errorMessage).toEqual(null);
    });

    it(`should work when passed ${actionTypes.ACCOUNT_ME_GET_ERROR}`, () => {
      // Arrange.
      const errorParams = {
        message: 'errorMessage'
      };
      const action = accountActions.accountMeError(errorParams.message);

      // Act.
      const newState = accountReducer(initialState.user, action);

      // Assert.
      expect(newState.error).toBe(true);
      expect(newState.errorMessage).toEqual(errorParams.message);
      expect(newState.isFetching).toBe(false);
    });
  });

  describe('Account Actions - Check and Set User State', () => {
    it(`should work when passed ${actionTypes.ACCOUNT_ME_CHECK}`, () => {
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
      const action = accountActions.accountMeCheck(user);

      // Act.
      const newState = accountReducer(initialState.user, action);

      // Assert.
      expect(newState.data).toEqual(user);
    });
  });
});
