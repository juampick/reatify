import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import auth from './sessionReducer';
import user from './accountReducer';
import {artistsFollowing, artistsRelated} from './artistsReducer';

const rootReducer = combineReducers({
  auth,
  user,
  artistsFollowing,
  artistsRelated,
  routing: routerReducer,
});

export default rootReducer;
