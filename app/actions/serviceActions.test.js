import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as serviceActions from './serviceActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Service Actions', () => {
  it(`should be able to dispatch ${types.SERVICE_ERROR} when executed: handleServiceError() with exampled error 500`, () => {
    // Arrange
    const error = {
      code: 500,
      message: 'Internal server error',
      details: {
        method: 'GET',
        url: 'http://api.spotify.com',
        fullUrl: 'http://api.spotify.com?type=artists',
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
});
