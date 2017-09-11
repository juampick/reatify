/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {checkAndSetSessionState} from './actions/sessionActions';
import {checkAndSetUserState} from './actions/accountActions';
import routes from './routes';
//Webpack CSS import
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './assets/styles/loading-splash.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Deploy trick - workaround for S3 Deployment:
// Convert from hashbang URLs to normal ones, so react-router gets correctly the request
browserHistory.listen(location => {
  const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
  if (path) {
    history.replace(path);
  }
});

//Dispatch action that checks if the user is logged && loads user data.
store.dispatch(checkAndSetSessionState());
store.dispatch(checkAndSetUserState());

render(
  <Provider store={store}>
    <Router history={history}>
      {routes(store)}
    </Router>
  </Provider>,
  document.getElementById('app')
);
