/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  FETCH_MEAL_ITEMS_LOADING,
  FETCH_MEAL_ITEMS_FAILURE,
  FETCH_MEAL_ITEMS_SUCCESS,
} from '../../../actions/actionTypes';
import {
  fetchMealItems,
  baseUrl
} from '../../../actions/admin/mealItemsAction';
import { mealItems } from '../../__mocks__/mockMealItems';

describe('Admin::Meal Items Action', () => {
  describe('Fetch meal Items', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch meal items success', async (done) => {
      moxios.stubRequest(`${baseUrl}/admin/meal-item`, {
        status: 200,
        response: {
          mealItems
        }
      });

      const expectedActions = [
        {
          type: FETCH_MEAL_ITEMS_LOADING,
          payload: true,
        },
        {
          type: FETCH_MEAL_ITEMS_SUCCESS,
          payload: mealItems,
        },
        {
          type: FETCH_MEAL_ITEMS_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});

      await store
        .dispatch(fetchMealItems())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('fetch meal items failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/admin/meal-item`, {
        status: 401,
      });
  
      const expectedActions = [
        {
          type: FETCH_MEAL_ITEMS_LOADING,
          payload: true,
        },
        {
          type: FETCH_MEAL_ITEMS_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: FETCH_MEAL_ITEMS_LOADING,
          payload: false,
        }
      ];
  
      const store = mockStore({});
  
      await store
        .dispatch(fetchMealItems())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});
