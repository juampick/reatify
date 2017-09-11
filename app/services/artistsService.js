import ApiBase from './apiBase';
import * as endpoints from '../resources/apiEndpoints';
import * as apiMethods from '../resources/apiMethods';
import {ARTIST} from '../resources/constants';

class ArtistsService {

  static getFollowingArtists(dispatch, limit = 50) {
    // Default Params
    let params = {
      type: ARTIST,
      limit: limit
    };

    return ApiBase.doRequest(dispatch, apiMethods.HTTP_GET, endpoints.ME_FOLLOWING, true, params)
      .then(response => response.json());
  }

  static getRelatedArtists(dispatch, id) {
    const url = `${endpoints.ARTISTS}/${id}/${endpoints.RELATED_ARTISTS}`;
    return ApiBase.doRequest(dispatch, apiMethods.HTTP_GET, url, true)
      .then(response => response.json());
  }

  static checkUserIsFollowingArtists(dispatch, ids) {
    const params = {
      type: ARTIST,
      ids: ids
    };
    const url = `${endpoints.ME_FOLLOWING}/contains`;
    return ApiBase.doRequest(dispatch, apiMethods.HTTP_GET, url, true, params)
      .then(response => response.json());
  }

  static followArtist(dispatch, ids) {
    const params = {
      type: ARTIST,
      ids: ids
    };
    return ApiBase.doRequest(dispatch, apiMethods.HTTP_PUT, endpoints.ME_FOLLOWING, true, params);
  }

  static unFollowArtist(dispatch, ids) {
    const params = {
      type: ARTIST,
      ids: ids
    };
    return ApiBase.doRequest(dispatch, apiMethods.HTTP_DELETE, endpoints.ME_FOLLOWING, true, params);
  }
}

export default ArtistsService;
