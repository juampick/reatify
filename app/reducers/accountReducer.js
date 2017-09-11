import * as types from '../actions/actionTypes';
import initialState from './initialState';

const accountReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case types.ACCOUNT_ME_GET_REQUEST:
      return Object.assign({}, state,
        {
          isFetching: true
        }
      );

    case types.ACCOUNT_ME_GET_SUCCESS:
      return Object.assign({}, state,
        {
          isFetching: false,
          error: false,
          errorMessage: null,
          receivedAt: Date.now(),
          data: action.user
        }
      );

    case types.ACCOUNT_ME_GET_ERROR:
      return Object.assign({}, state,
        {
          isFetching: false,
          error: true,
          errorMessage: action.message,
          data: {}
        }
      );

    case types.ACCOUNT_ME_CHECK:
      return Object.assign({}, state,
        {
          isFetching: false,
          error: false,
          errorMessage: null,
          receivedAt: Date.now(),
          data: action.user
        }
      );

    default:
      return state;
  }
};

export default accountReducer;
