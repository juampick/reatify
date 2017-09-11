import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePageComponent from './components/pages/home/HomePage';
import LoginPageComponent from './components/pages/login/LoginPage';
import ProfilePageComponent from './components/pages/profile/ProfilePage';
import ErrorPageComponent from './components/pages/error/ErrorPage';
import NotFound from './components/pages/not_found/NotFound';
import {SPOTIFY_ACCESS_TOKEN} from './resources/constants';
import * as localStorageHelper from './helpers/localStorageHelper';

/*eslint-disable react/display-name */
export default () => {

  function requireAuth(nextState, replace) {
    if (!localStorageHelper.get(SPOTIFY_ACCESS_TOKEN)) {
      replace({
        pathname: '/login',
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
      <IndexRoute component={HomePageComponent} onEnter={requireAuth}/>
      <Route path="login" component={LoginPageComponent} onEnter={redirectIfLogged}/>
      <Route path="callback" component={LoginPageComponent}/>
      <Route path="error" component={ErrorPageComponent}/>

      <Route path="profile" component={ProfilePageComponent} onEnter={requireAuth}/>

      <Route path="*" component={NotFound}/>
    </Route>
  );
};
