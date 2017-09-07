import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

const middleware = applyMiddleware(
  thunk,
  routerMiddleware(browserHistory)
);

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    middleware
  );
}
