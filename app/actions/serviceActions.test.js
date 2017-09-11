import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as serviceActions from './serviceActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Service Actions', () => {
  describe('Session Actions - Log In', () => {
    xit(`should be able to dispatch ${types.SERVICE_ERROR} when executed: handleServiceError() with error 401`, () => {
      // Arrange
      const error = {
        code: 401,
        message: 'Unauthorized',
        details: {
          method: 'POST',
          url: 'auth/login',
          fullUrl: null,
          requireAuth: false
        },
        payload: {}
      };

      const store = mockStore();

      // Act & assert.
      store.dispatch(serviceActions.handleServiceError(error));
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: types.SERVICE_ERROR,
        error: error
      });
    });

    xit(`should be able to dispatch ${types.SERVICE_ERROR} when executed: handleServiceError() with error 500`, () => {
      // Arrange
      const error = {
        code: 500,
        message: 'Internal server error',
        details: {
          method: 'GET',
          url: 'dairies',
          fullUrl: 'dairies?page=1&pageSize=99',
          requireAuth: false
        },
        payload: {}
      };

      const store = mockStore({});

      // Act & assert.
      store.dispatch(serviceActions.handleServiceError(error));
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: types.SERVICE_ERROR,
        error: error
      });
    });
/*
    xit(`should be able to dispatch ${types.SERVICE_ERROR} and ${types.LOG_OUT_REQUEST} when executed: handleServiceError() with error 401 `, () => {
      // Arrange
      const error = {
        code: 401,
        message: 'Unauthorized',
        details: {
          method: 'POST',
          url: 'dairies',
          fullUrl: null,
          requireAuth: false
        },
        payload: {}
      };

      const store = mockStore({
        session: {
          loggingOut: false
        }
      });

      // Act & assert.
      store.dispatch(serviceActions.handleServiceError(error));
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: types.LOG_OUT_REQUEST
      });
      expect(actions[1]).toEqual({
        type: types.SERVICE_ERROR,
        error: error
      });
    });
*/
  });


});
