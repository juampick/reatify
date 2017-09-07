import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/pages/home/HomePage';
import AboutPage from './components/pages/about/AboutPage';
import NotFound from './components/pages/not_found/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/about" component={AboutPage}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
