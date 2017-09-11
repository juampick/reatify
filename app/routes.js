import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/pages/home/HomePage';
import LoginPage from './components/pages/login/LoginPage';
import ProfilePage from './components/pages/profile/ProfilePage';
import ErrorPage from './components/pages/error/ErrorPage';
import NotFound from './components/pages/not_found/NotFound';
//import {logOut} from './actions/sessionActions';
import {SPOTIFY_ACCESS_TOKEN} from './resources/constants';
import * as localStorageHelper from './helpers/localStorageHelper';

/*eslint-disable react/display-name */
export default () => {

  function requireAuth(nextState, replace) {
    if (!localStorageHelper.get(SPOTIFY_ACCESS_TOKEN)) {
      replace({
        pathname: 'login',
        state: {nextPathname: nextState.location.pathname} //ToDo: is this ok?
      });
    }
  }

  function redirectIfLogged(nextState, replace) {
    if (!localStorageHelper.get(SPOTIFY_ACCESS_TOKEN)) return; //If no access_token is settled, end function.

    replace({
      pathname: '/',
      state: {nextPathname: nextState.location.pathname} //ToDo: is this ok?
    });
  }

  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} onEnter={requireAuth}/>
      <Route path="login" component={LoginPage} onEnter={redirectIfLogged}/>
      <Route path="callback" component={LoginPage}/>
      <Route path="error" component={ErrorPage}/>

      <Route path="profile" component={ProfilePage} onEnter={requireAuth}/>

      <Route path="*" component={NotFound}/>
    </Route>
  );
};
