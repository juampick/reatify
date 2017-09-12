import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import queryString from 'query-string';
import * as endpoints from '../resources/apiEndpoints';
import * as types from './actionTypes';
import * as artistsActions from './artistsActions';
import * as testHelper from '../testHelper';
import {ARTIST, RELATED_ARTIST_SELECTED, SPOTIFY_ACCESS_TOKEN} from '../resources/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Artists Actions', () => {
  afterEach(() => {
    testHelper.cleanNock();
  });

  describe('Artists Actions - Get Following Artists', () => {
    it(`should be able to dispatch ${types.ARTISTS_FOLLOWING_GET_REQUEST} and ${types.ARTISTS_FOLLOWING_GET_SUCCESS} when getFollowingArtists() action is call with correct params`, () => {
      // Arrange.
      const artistsResponse = {
        artists: {
          cursors: {after: "3vcFXwLEUdfWMu7gTQKyot"},
          href: "https://api.spotify.com/v1/me/following?type=artist&limit=50",
          items: [
            {
              id: '12fdfhsdjfds',
              name: "Test Artists",
              external_urls: {spotify: "https://open.spotify.com/artist/03CueHDpVcwXQZHeBlZUkd"},
              followers: {
                total: 1000
              },
              href: null,
              images: [{url: ''}, {url: ''}],
              popularity: 100
            }
          ],
          limit: 50,
          next: "https://api.spotify.com/v1/me/following?type=artist&after=3vcFXwLEUdfWMu7gTQKyot&limit=50",
          total: 104
        }
      };

      const urlParams = {
        limit: 50,
        type: ARTIST
      };

      const queryStrParams = queryString.stringify(urlParams);
      const url = `/${endpoints.ME_FOLLOWING}?${queryStrParams}`;
      testHelper.getAuthenticatedNock()
        .get(url)
        .reply(200, {
          ...artistsResponse
        });

      localStorage.setItem(SPOTIFY_ACCESS_TOKEN, testHelper.token);

      const store = mockStore({});

      // Act & assert.
      store.dispatch(artistsActions.getFollowingArtists())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual({
            type: types.ARTISTS_FOLLOWING_GET_REQUEST
          });
          expect(actions[1]).toEqual({
            type: types.ARTISTS_FOLLOWING_GET_SUCCESS,
            items: artistsResponse.artists.items
          });
        });
    });

    it(`should be able to dispatch ${types.ARTISTS_FOLLOWING_GET_REQUEST}, ${types.ARTISTS_FOLLOWING_GET_ERROR} when getFollowingArtists() action is call with bad params`, () => {
      // Arrange.
      const artistsResponseError = {
        message: 'Unknown Error'
      };

      const urlParams = {
        limit: 50,
        type: 'failtest'
      };

      const queryStrParams = queryString.stringify(urlParams);
      const url = `/${endpoints.ME_FOLLOWING}?${queryStrParams}`;
      testHelper.getAuthenticatedNock()
        .get(url)
        .reply(200, {
          ...artistsResponseError
        });

      const store = mockStore({});

      // Act & assert.
      return store.dispatch(artistsActions.getFollowingArtists())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual({
            type: types.ARTISTS_FOLLOWING_GET_REQUEST
          });
          expect(actions[1]).toEqual({
            type: types.ARTISTS_FOLLOWING_GET_ERROR,
            message: artistsResponseError.message
          });
        });
    });
  });

  describe('Artists Actions - Get Related Artists', () => {
    it(`should be able to dispatch ${types.ARTISTS_RELATED_GET_REQUEST} and ${types.ARTISTS_RELATED_GET_SUCCESS} when getRelatedArtists() action is call with correct params`, () => {
      // Arrange.
      const artistsResponse = {
        artists: [
          {
            id: '12345',
            href: "https://api.spotify.com/v1/artists/0C8ZW7ezQVs4URX5aX7Kqx",
            name: "Test Artists",
            external_urls: {spotify: "https://open.spotify.com/artist/0C8ZW7ezQVs4URX5aX7Kqx"},
            followers: {
              total: 1000
            },
            images: [{url: ''}, {url: ''}],
            popularity: 100
          }
        ]
      };

      const artistsFollowingResponse = {
        test: 'ds'
      };

      const params = {
        id: '12345',
        name: 'Test Artists'
      };

      //Mocking both services:

      const urlRelatedArtists = `/${endpoints.ARTISTS}/${params.id}/${endpoints.RELATED_ARTISTS}`;
      testHelper.getAuthenticatedNock()
        .get(urlRelatedArtists)
        .reply(200, {
          ...artistsResponse
        });

      localStorage.setItem(SPOTIFY_ACCESS_TOKEN, testHelper.token);
      localStorage.setItem(RELATED_ARTIST_SELECTED, JSON.stringify({id: params.id, name: params.name}));

      const urlParams = {
        type: ARTIST,
        ids: ['12345']
      };

      const queryStrParams = queryString.stringify(urlParams);
      const urlUserFollowingArtists = `/${endpoints.ME_FOLLOWING}/contains?${queryStrParams}`;
      testHelper.getAuthenticatedNock()
        .get(urlUserFollowingArtists)
        .reply(200, {
          ...artistsFollowingResponse
        });

      const store = mockStore({});

      // Act & assert.
      return store.dispatch(artistsActions.getRelatedArtists(params.id, params.name))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual({
            type: types.ARTISTS_RELATED_GET_REQUEST,
            id: params.id,
            name: params.name
          });
          expect(actions[1]).toEqual({
            type: types.ARTISTS_RELATED_GET_SUCCESS,
            id: params.id,
            items: artistsResponse.artists
          });
        });
    });

    it(`should be able to dispatch ${types.ARTISTS_RELATED_GET_REQUEST} and ${types.ARTISTS_RELATED_GET_SUCCESS} when getRelatedArtists() action is call with bad params`, () => {
      // Arrange.
      const artistsResponseError = {
        message: 'Unknown Error'
      };

      const artistsFollowingResponse = {
        test: 'ds'
      };

      const params = {
        id: '12345',
        name: 'Test Artists'
      };

      //Mocking both services:

      const urlRelatedArtists = `/${endpoints.ARTISTS}/${params.id}/${endpoints.RELATED_ARTISTS}`;
      testHelper.getAuthenticatedNock()
        .get(urlRelatedArtists)
        .reply(500, {
          ...artistsResponseError
        });

      localStorage.setItem(SPOTIFY_ACCESS_TOKEN, testHelper.token);
      localStorage.setItem(RELATED_ARTIST_SELECTED, JSON.stringify({id: params.id, name: params.name}));

      const urlParams = {
        type: ARTIST,
        ids: ['12345']
      };

      const queryStrParams = queryString.stringify(urlParams);
      const urlUserFollowingArtists = `/${endpoints.ME_FOLLOWING}/contains?${queryStrParams}`;
      testHelper.getAuthenticatedNock()
        .get(urlUserFollowingArtists)
        .reply(200, {
          ...artistsFollowingResponse
        });

      const store = mockStore({});

      // Act & assert.
      return store.dispatch(artistsActions.getRelatedArtists(params.id, params.name))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual({
            type: types.ARTISTS_RELATED_GET_REQUEST,
            id: params.id,
            name: params.name
          });
          expect(actions[1].type).toEqual(types.SERVICE_ERROR);
          expect(actions[2]).toEqual({
            type: types.ARTISTS_RELATED_GET_ERROR,
            id: params.id,
            message: artistsResponseError.message
          });
        });
    });
  });

  describe('Artists Actions - Reset Related Artists', () => {
    it(`should be able to dispatch ${types.ARTISTS_RELATED_RESET} when resetRelatedArtists() action is call`, () => {
      // Arrange.
      const store = mockStore({});

      // Act & assert.
      store.dispatch(artistsActions.resetRelatedArtists());

      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: types.ARTISTS_RELATED_RESET
      });
    });
  });

  describe('Artists Actions - Update: Follow && UnFollow', () => {
    describe('Update - Follow', () => {
      it(`should be able to dispatch ${types.ARTISTS_FOLLOWING_UPDATE_REQUEST} and ${types.ARTISTS_FOLLOWING_UPDATE_SUCCESS} when updateFollowArtist() action is call with follow as true`, () => {
        // Arrange.
        const params = {
          id: '12345',
          follow: true
        };

        const urlParams = {
          type: ARTIST,
          ids: ['12345']
        };
        const queryStrParams = queryString.stringify(urlParams);
        const url = `/${endpoints.ME_FOLLOWING}?${queryStrParams}`;
        testHelper.getAuthenticatedNock()
          .put(url)
          .reply(204, {});

        const store = mockStore({});

        // Act & assert.
        return store.dispatch(artistsActions.updateFollowArtist(params.id, params.follow))
          .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
              type: types.ARTISTS_FOLLOWING_UPDATE_REQUEST,
              id: params.id
            });
            expect(actions[1]).toEqual({
              type: types.ARTISTS_FOLLOWING_UPDATE_SUCCESS,
              id: params.id,
              followed: true
            });
          });
      });

      it(`should be able to dispatch ${types.ARTISTS_FOLLOWING_UPDATE_REQUEST}, ${types.ARTISTS_FOLLOWING_UPDATE_ERROR} when updateFollowArtist() action is call returning a 500 error`, () => {
        // Arrange.
        const artistsResponseError = {
          message: 'Unknown Error'
        };

        // Arrange.
        const params = {
          id: '12345',
          follow: true
        };

        const urlParams = {
          type: ARTIST,
          ids: ['12345']
        };
        const queryStrParams = queryString.stringify(urlParams);
        const url = `/${endpoints.ME_FOLLOWING}?${queryStrParams}`;
        testHelper.getAuthenticatedNock()
          .put(url)
          .reply(500, {});

        const store = mockStore({});

        // Act & assert.
        return store.dispatch(artistsActions.updateFollowArtist(params.id, params.follow))
          .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
              type: types.ARTISTS_FOLLOWING_UPDATE_REQUEST,
              id: params.id
            });
            expect(actions[1].type).toEqual(types.SERVICE_ERROR);
            expect(actions[2]).toEqual({
              type: types.ARTISTS_FOLLOWING_UPDATE_ERROR,
              id: params.id,
              message: artistsResponseError.message
            });
          });
      });
    });

    describe('Update - UnFollow', () => {
      it(`should be able to dispatch ${types.ARTISTS_FOLLOWING_DELETE_REQUEST} and ${types.ARTISTS_FOLLOWING_DELETE_SUCCESS} when updateFollowArtist() action is call with with follow as false`, () => {
        // Arrange.
        const params = {
          id: '12345',
          follow: false
        };

        const urlParams = {
          type: ARTIST,
          ids: ['12345']
        };
        const queryStrParams = queryString.stringify(urlParams);
        const url = `/${endpoints.ME_FOLLOWING}?${queryStrParams}`;
        testHelper.getAuthenticatedNock()
          .delete(url)
          .reply(200, {});

        const store = mockStore({});

        // Act & assert.
        return store.dispatch(artistsActions.updateFollowArtist(params.id, params.follow))
          .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
              type: types.ARTISTS_FOLLOWING_DELETE_REQUEST,
              id: params.id
            });
            expect(actions[1]).toEqual({
              type: types.ARTISTS_FOLLOWING_DELETE_SUCCESS,
              id: params.id,
              followed: false
            });
          });
      });

      it(`should be able to dispatch ${types.ARTISTS_FOLLOWING_DELETE_REQUEST}, ${types.ARTISTS_FOLLOWING_DELETE_ERROR} when updateFollowArtist() action is call returning a 500 error`, () => {
        // Arrange.
        const artistsResponseError = {
          message: 'Unknown Error'
        };

        // Arrange.
        const params = {
          id: '12345',
          follow: false
        };

        const urlParams = {
          type: ARTIST,
          ids: ['12345']
        };
        const queryStrParams = queryString.stringify(urlParams);
        const url = `/${endpoints.ME_FOLLOWING}?${queryStrParams}`;
        testHelper.getAuthenticatedNock()
          .delete(url)
          .reply(500, {});

        const store = mockStore({});

        // Act & assert.
        return store.dispatch(artistsActions.updateFollowArtist(params.id, params.follow))
          .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
              type: types.ARTISTS_FOLLOWING_DELETE_REQUEST,
              id: params.id
            });
            expect(actions[1].type).toEqual(types.SERVICE_ERROR);
            expect(actions[2]).toEqual({
              type: types.ARTISTS_FOLLOWING_DELETE_ERROR,
              id: params.id,
              message: artistsResponseError.message
            });
          });
      });
    });
  });
});
