import expect from 'expect';
import initialState from './initialState';
import {artistsFollowing, artistsRelated} from './artistsReducer';
import * as artistsActions from '../actions/artistsActions';
import * as actionTypes from '../actions/actionTypes';

describe('Artists Reducer', () => {
  describe('Artists Reducer - Following', () => {
    it(`should work when passed ${actionTypes.ARTISTS_FOLLOWING_GET_REQUEST}`, () => {
      // Arrange.
      const action = artistsActions.artistsFollowingGetRequest();

      // Act.
      const newState = artistsFollowing(initialState.artists.following, action);

      // Assert.
      expect(newState.isFetching).toBe(true);
      expect(newState.items).toEqual([]);
    });

    it(`should work when passed ${actionTypes.ARTISTS_FOLLOWING_GET_SUCCESS}`, () => {
      // Arrange.
      const dateReceived = Date.now();
      const items = [
        {}, {}, {}
      ];

      const action = artistsActions.artistsFollowingGetSuccess(items);

      // Act.
      const newState = artistsFollowing(initialState.artists.following, action);

      // Assert.
      expect(newState.items).toEqual(items);
      expect(newState.isFetching).toBe(false);
      expect(newState.receivedAt).toBeGreaterThanOrEqualTo(dateReceived);
      expect(newState.error).toBe(false);
      expect(newState.errorMessage).toEqual(null);
    });

    it(`should work when passed ${actionTypes.ARTISTS_FOLLOWING_GET_ERROR}`, () => {
      // Arrange.
      const errorParams = {
        message: 'errorMessage'
      };
      const action = artistsActions.artistsFollowingGetError(errorParams.message);

      // Act.
      const newState = artistsFollowing(initialState.artists.following, action);

      // Assert.
      expect(newState.error).toBe(true);
      expect(newState.errorMessage).toEqual(errorParams.message);
      expect(newState.isFetching).toBe(false);
    });
  });

  describe('Artists Reducer - Related', () => {
    describe('Related - Related GET', () => {
      it(`should work when passed ${actionTypes.ARTISTS_RELATED_GET_REQUEST}`, () => {
        //params:
        const params = {
          id: '12345',
          name: 'TestArtist'
        };

        // Arrange.
        const action = artistsActions.artistsRelatedGetRequest(params.id, params.name);

        // Act.
        const newState = artistsRelated(initialState.artists.related, action);

        // Assert.
        expect(newState.id).toEqual(params.id);
        expect(newState.name).toEqual(params.name);
        expect(newState.isFetching).toBe(true);
        expect(newState.items).toEqual([]);
      });

      it(`should work when passed ${actionTypes.ARTISTS_RELATED_GET_SUCCESS}`, () => {
        //params:
        const params = {
          id: '12345'
        };

        // Arrange.
        const dateReceived = Date.now();
        const items = [
          {}, {}, {}
        ];

        const action = artistsActions.artistsRelatedGetSuccess(params.id, items);

        // Act.
        const newState = artistsRelated(initialState.artists.related, action);

        // Assert.
        expect(newState.id).toEqual(params.id);
        expect(newState.name).toEqual(newState.name);
        expect(newState.items).toEqual(items);
        expect(newState.isFetching).toBe(false);
        expect(newState.receivedAt).toBeGreaterThanOrEqualTo(dateReceived);
        expect(newState.error).toBe(false);
        expect(newState.errorMessage).toEqual(null);
      });

      it(`should work when passed ${actionTypes.ARTISTS_RELATED_GET_ERROR}`, () => {
        //params:
        const params = {
          id: '12345'
        };

        // Arrange.
        const errorParams = {
          message: 'errorMessage'
        };
        const action = artistsActions.artistsRelatedGetError(params.id, errorParams.message);

        // Act.
        const newState = artistsRelated(initialState.artists.related, action);

        // Assert.
        expect(newState.id).toBe(params.id);
        expect(newState.name).toBe(newState.name);
        expect(newState.error).toBe(true);
        expect(newState.errorMessage).toEqual(errorParams.message);
        expect(newState.isFetching).toBe(false);
        expect(newState.items).toEqual([]);
      });
    });

    describe('Related - Related Reset', () => {
      it(`should work when passed ${actionTypes.ARTISTS_RELATED_RESET}`, () => {
        // Arrange.
        const action = artistsActions.artistsRelatedReset();

        // Act.
        const newState = artistsRelated(initialState.artists.related, action);

        expect(newState.id).toEqual(null);
        expect(newState.name).toEqual(null);
        expect(newState.isFetching).toBe(false);
        expect(newState.items).toEqual([]);
        expect(newState.error).toBe(false);
      });
    });
  });

  describe('Following - Update: Follow', () => {
    it(`should work when passed ${actionTypes.ARTISTS_FOLLOWING_UPDATE_REQUEST}`, () => {
      //params:
      const params = {
        id: '12345',
        name: 'TestArtist'
      };

      // Arrange.
      const action = artistsActions.artistsFollowingUpdateRequest('777');

      const state = {
        id: params.id,
        name: params.name,
        items: [
          {id: '777', name: 'testArtist 1'}, {id: '763', name: 'testArtist 2'}
        ],
        isFetching: false,
        receivedAt: 12323222,
        error: false,
        errorMessage: null
      };

      // Act.
      const newState = artistsRelated(state, action);

      // Assert.
      expect(newState.items[0].isUpdating).toBe(true);
      expect(newState.items[0].name).toEqual('testArtist 1');
    });

    it(`should work when passed ${actionTypes.ARTISTS_FOLLOWING_UPDATE_SUCCESS}`, () => {
      //params:
      const params = {
        id: '12345',
        name: 'TestArtist'
      };

      // Arrange.
      const action = artistsActions.artistsFollowingUpdateSuccess('777');

      const state = {
        id: params.id,
        name: params.name,
        items: [
          {id: '777', name: 'testArtist 1', followed: false}, {id: '763', name: 'testArtist 2', followed: true}
        ],
        isFetching: false,
        receivedAt: 12323222,
        error: false,
        errorMessage: null
      };

      // Act.
      const newState = artistsRelated(state, action);

      // Assert.
      expect(newState.items[0].isUpdating).toBe(false);
      expect(newState.items[0].name).toEqual('testArtist 1');
      expect(state.items[0].followed).toBe(false);
      expect(newState.items[0].followed).toBe(true);
    });

    it(`should work when passed ${actionTypes.ARTISTS_FOLLOWING_UPDATE_ERROR}`, () => {
      //params:
      const params = {
        id: '12345',
        name: 'TestArtist'
      };

      // Arrange.
      const action = artistsActions.artistsFollowingUpdateError('777', 'Error Message');

      const state = {
        id: params.id,
        name: params.name,
        items: [
          {id: '777', name: 'testArtist 1', followed: false}, {id: '763', name: 'testArtist 2', followed: true}
        ],
        isFetching: false,
        receivedAt: 12323222,
        error: false,
        errorMessage: null
      };

      // Act.
      const newState = artistsRelated(state, action);

      // Assert.
      expect(newState.items[0].isUpdating).toBe(false);
      expect(newState.items[0].name).toEqual('testArtist 1');
      expect(state.items[0].followed).toBe(false);
      expect(newState.items[0].followed).toBe(false);
    });
  });

  describe('Following - Update: Unfollow', () => {
    it(`should work when passed ${actionTypes.ARTISTS_FOLLOWING_DELETE_REQUEST}`, () => {
      //params:
      const params = {
        id: '12345',
        name: 'TestArtist'
      };

      // Arrange.
      const action = artistsActions.artistsFollowingDeleteRequest('777');

      const state = {
        id: params.id,
        name: params.name,
        items: [
          {id: '777', name: 'testArtist 1'}, {id: '763', name: 'testArtist 2'}
        ],
        isFetching: false,
        receivedAt: 12323222,
        error: false,
        errorMessage: null
      };

      // Act.
      const newState = artistsRelated(state, action);

      // Assert.
      expect(newState.items[0].isUpdating).toBe(true);
      expect(newState.items[0].name).toEqual('testArtist 1');
    });

    it(`should work when passed ${actionTypes.ARTISTS_FOLLOWING_DELETE_SUCCESS}`, () => {
      //params:
      const params = {
        id: '12345',
        name: 'TestArtist'
      };

      // Arrange.
      const action = artistsActions.artistsFollowingDeleteSuccess('777');

      const state = {
        id: params.id,
        name: params.name,
        items: [
          {id: '777', name: 'testArtist 1', followed: false}, {id: '763', name: 'testArtist 2', followed: true}
        ],
        isFetching: false,
        receivedAt: 12323222,
        error: false,
        errorMessage: null
      };

      // Act.
      const newState = artistsRelated(state, action);

      // Assert.
      expect(newState.items[0].isUpdating).toBe(false);
      expect(newState.items[0].name).toEqual('testArtist 1');
      expect(state.items[0].followed).toBe(false);
    });

    it(`should work when passed ${actionTypes.ARTISTS_FOLLOWING_DELETE_ERROR}`, () => {
      //params:
      const params = {
        id: '12345',
        name: 'TestArtist'
      };

      // Arrange.
      const action = artistsActions.artistsFollowingDeleteError('777', 'Error Message');

      const state = {
        id: params.id,
        name: params.name,
        items: [
          {id: '777', name: 'testArtist 1', followed: false}, {id: '763', name: 'testArtist 2', followed: true}
        ],
        isFetching: false,
        receivedAt: 12323222,
        error: false,
        errorMessage: null
      };

      // Act.
      const newState = artistsRelated(state, action);

      // Assert.
      expect(newState.items[0].isUpdating).toBe(false);
      expect(newState.items[0].name).toEqual('testArtist 1');
      expect(state.items[0].followed).toBe(false);
      expect(newState.items[0].followed).toBe(false);
    });
  });
});
