import ApiBase from './apiBase';
import * as endpoints from '../resources/apiEndpoints';
import * as apiMethods from '../resources/apiMethods';

class AccountService {

  static getAccountData(dispatch) {
    return ApiBase.doRequest(dispatch, apiMethods.HTTP_GET, endpoints.ME, true)
      .then(response => response.json());
  }
}

export default AccountService;
