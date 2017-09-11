import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import * as endpoints from '../resources/apiEndpoints';
import {handleServiceError} from '../actions/serviceActions';
import ServiceError from './serviceError';
import {SPOTIFY_ACCESS_TOKEN} from '../resources/constants';
import * as localStorageHelper from '../helpers/localStorageHelper';

const AUTHORIZATION = 'AUTHORIZATION';

const defaultHeaders = {
  'Content-Type': 'application/json'
};

class ApiBase {

  /**
   * Method that will parse to json the body if possible
   * @param response
   * @returns {Promise.<TResult>}
   */
  static parseBody(response) {
    return Promise.resolve(response.json())
      .then(json => json)
      .catch(() => Promise.resolve());
  }

  /**
   * Base method to call an API endpoint. You only need to pass the required parameters and will reply the response accordingly.
   * @param dispatch
   * @param method
   * @param url
   * @param requireAuth
   * @param params
   * @param body
   * @returns {Promise.<T>|*}
   */
  static doRequest(dispatch, method, url, requireAuth = false, params = false, body = false) {
    let headers = Object.assign({}, defaultHeaders);
    if (requireAuth) {
      headers = Object.assign(headers, {AUTHORIZATION: `Bearer ${localStorageHelper.get(SPOTIFY_ACCESS_TOKEN)}`});
    }

    let options = {
      method: method,
      headers: new Headers(headers)
    };

    if (body) {
      options = Object.assign({}, options, {
        body: JSON.stringify(body)
      });
    }

    let fullUrl = `${endpoints.SPOTIFY_WEB_API_HOST}${url}`;

    if (params) {
      const queryStrParams = queryString.stringify(params);
      fullUrl = fullUrl.concat(`?${queryStrParams}`);
    }

    const request = new Request(fullUrl, options);

    return fetch(request)
      .then(response => {
        switch (response.status) {
          case 500: {
            const serviceError = new ServiceError(500, 'Error 500', method, url, fullUrl, requireAuth);
            dispatch(handleServiceError(serviceError));
            return Promise.reject(serviceError);
          }
          case 401: { //Unauthorized
            const serviceError = new ServiceError(401, 'Error 401', method, url, fullUrl, requireAuth);
            return this.parseBody(response)
              .then((json) => {
                serviceError.setPayload(json);
                dispatch(handleServiceError(serviceError));
                return Promise.reject(serviceError);
              });
          }
        }

        // Status in not the range <200 to 299>
        if (!response.ok) {
          const serviceError = new ServiceError(response.status, response.statusText, method, url, fullUrl, requireAuth);
          dispatch(handleServiceError(serviceError));
          return Promise.reject(serviceError);
        }

        return response;
      })
      .catch(error => {
        throw error;
      });
  }
}

export default ApiBase;
