import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

const logger = createLogger();

// In order to use the devtools (https://github.com/gaearon/redux-devtools)
// we prepare it to enhance the store.
const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f;

const middleware = applyMiddleware(
  thunk,
  reduxImmutableStateInvariant(),
  logger,
  routerMiddleware(browserHistory)
);

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(middleware, devtools)
  );
}

