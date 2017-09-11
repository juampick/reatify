export default {
  auth: {
    loggedIn: false,
    error: false,
    errorMessage: null,
    authorizeUrl: null,
    session: {
      accessToken: null,
      expireIn: null,
      loggedAt: null
    },
    sessionExpired: {
      expired: false,
      expiredAt: null
    }
  },
  user: {
    data: {},
    isFetching: false,
    receivedAt: null,
    error: false,
    errorMessage: null
  },
  artists: {
    following: {
      items: [],
      isFetching: false,
      receivedAt: null,
      error: false,
      errorMessage: null
    },
    related: {
      id: null,
      name: null,
      items: [],
      isFetching: false,
      receivedAt: null,
      error: false,
      errorMessage: null
    }
  }
};

