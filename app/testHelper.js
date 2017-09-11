import nock from 'nock';
import * as endpoints from './resources/apiEndpoints';

export const token = 'BQBkuCJMaNZ8klfz0jnAjxY7nbcGWoxLdWGE7W-AD4I_a03S8iI857LjGqJTkIWVjHuhU5OSAYCl-xAXeUOH8uY9Pfeue3I8i-r2j-IMeMeGr0wj4UmtmSFQx7besvt4MUJVz9AQkvWJo9HA2mX7VdcUp6uxeg-vru2ZdjzLwWC-176X8VFNeCdf';

export function cleanNock() {
  nock.cleanAll();
}

export function getAuthenticatedNock() {
  return nock(endpoints.SPOTIFY_WEB_API_HOST, {
    reqheaders: {
      'AUTHORIZATION': `Bearer ${token}`
    }
  });
}

export function getUnAuthenticatedNock() { //ToDo: check if this is used or not.
  return nock(endpoints.SPOTIFY_WEB_API_HOST);
}
