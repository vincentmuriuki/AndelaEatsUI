/* eslint-disable no-undef */
import moxios from 'moxios';

import { 
  FETCH_VENDOR_ENGAGEMENT_LOADING, 
  FETCH_VENDOR_ENGAGEMENT_SUCCESS, 
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
  CREATE_VENDOR_ENGAGEMENT_LOADING,
  CREATE_VENDOR_ENGAGEMENT_SUCCESS,
  CREATE_VENDOR_ENGAGEMENT_FAILURE
} from '../../../actions/actionTypes';

import { 
  baseUrl, 
  fetchEngagements,
  createEngagement 
} from '../../../actions/admin/engagementsAction';

import engagements from '../../__mocks__/mockEngagements';
import { newEngagement } from '../../__mocks__/mockEngagements';

describe('Engagements Action', () => {
  describe('Fetch Engagements', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    
    it('fetch engagement success', async (done) => {
      moxios.stubRequest(`${baseUrl}/engagements/`, {
        status: 200,
        response: {
          payload: {
            engagements
          }
        }
      });

      const expectedAction = [
        {
          type: FETCH_VENDOR_ENGAGEMENT_LOADING,
          payload: true
        },
        {
          type: FETCH_VENDOR_ENGAGEMENT_SUCCESS,
          payload: engagements
        },
        {
          type: FETCH_VENDOR_ENGAGEMENT_LOADING,
          payload: false
        }
      ];

      const store = mockStore({});
      await store 
        .dispatch(fetchEngagements())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('fetch vendors failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/engagements/`, {
        status: 401
      });

      const expectedActions = [
        {
          type: FETCH_VENDOR_ENGAGEMENT_LOADING,
          payload: true
        },
        {
          type: FETCH_VENDOR_ENGAGEMENT_FAILURE,
          payload: new Error('Request failed with status code 401')
        },
        {
          type: FETCH_VENDOR_ENGAGEMENT_LOADING,
          payload: false
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(fetchEngagements())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});


describe('Create Engagement', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('create engagement success', async (done) => {
    moxios.stubRequest(`${baseUrl}/engagements/`, {
      status: 201,
      response: {
        payload: {
          engagement: newEngagement
        }
      }
    });
    

    const expectedActions = [
      {
        type: CREATE_VENDOR_ENGAGEMENT_LOADING,
        payload: true,
      },
      {
        type: CREATE_VENDOR_ENGAGEMENT_SUCCESS,
        payload: newEngagement,
      },
      {
        type: CREATE_VENDOR_ENGAGEMENT_LOADING,
        payload: false,
      }
    ];

    const store = mockStore({});
    await store
      .dispatch(createEngagement(newEngagement))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('create engagement failure', async (done) => {
    moxios.stubRequest(`${baseUrl}/engagements/`, {
      status: 401,
      response: {}
    });

    const expectedActions = [
      {
        type: CREATE_VENDOR_ENGAGEMENT_LOADING,
        payload: true,
      },
      {
        type: CREATE_VENDOR_ENGAGEMENT_FAILURE,
        payload: new Error('Request failed with status code 401'),
      },
      {
        type: CREATE_VENDOR_ENGAGEMENT_LOADING,
        payload: false,
      }
    ];

    const store = mockStore({});
    await store
      .dispatch(createEngagement(newEngagement))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});