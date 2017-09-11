import * as endpoints from '../services/apiEndpoints';
import * as apiMethods from './apiMethods';
import ApiBase from './apiBase';

class AccountService {

  static getAccountData(dispatch) {
    return ApiBase.doRequest(dispatch, apiMethods.HTTP_GET, endpoints.ME, true)
      .then(response => response.json());
  }
}

export default AccountService;
