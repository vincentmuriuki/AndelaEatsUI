/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  FETCH_MEAL_ITEMS_LOADING,
  FETCH_MEAL_ITEMS_FAILURE,
  FETCH_MEAL_ITEMS_SUCCESS,
  SET_ADD_MEAL_LOADING,
  ADD_MEAL_ITEM_SUCCESS,
  SHOW_MEAL_MODAL,
  DELETE_MEAL_ITEM_LOADING,
  DELETE_MEAL_ITEM_SUCCESS,
  DELETE_MEAL_ITEM_FAILURE,
} from '../../../actions/actionTypes';

import {
  fetchMealItems,
  baseUrl,
  deleteMealItem,
  addMealItem
} from '../../../actions/admin/mealItemsAction';

import { mealItems } from '../../__mocks__/mockMealItems';

describe('Admin::Meal Items Action', () => {
  describe('Fetch meal Items', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch meal items success', async (done) => {
      moxios.stubRequest(`${baseUrl}/admin/meal-items`, {
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
      moxios.stubRequest(`${baseUrl}/admin/meal-items`, {
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

  describe('Add meal Item Action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    const store = mockStore({});
      
    const formData = {
      name: 'Ugeli',
      type: 'side',
      image: new File([''], 'filename', { type: 'image/png' })
    };

    const expectedActions = [
      {
        type: SET_ADD_MEAL_LOADING,
        payload: true
      },
      {
        type: ADD_MEAL_ITEM_SUCCESS,
        payload: mealItems[0]
      },
      {
        type: SHOW_MEAL_MODAL,
        payload: false
      },
      {
        type: SET_ADD_MEAL_LOADING,
        payload: false
      },
    ];

    it('should add a meal without error', async (done) => {
      moxios.stubRequest(`${baseUrl}/admin/meal-items`, {
        status: 201,
        response: {
          mealItem: {
            ...mealItems[0]
          }
        }
      });

      await store
        .dispatch(addMealItem(formData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('should add a meal with error', async (done) => {
      moxios.stubRequest(`${baseUrl}/admin/meal-items`, {
        status: 500,
        error: {}
      });

      const newExpectedActions = expectedActions.concat([
        expectedActions[0],
        { ...expectedActions[0], payload: false }
      ]);

      await store
        .dispatch(addMealItem(formData))
        .then(() => {
          expect(store.getActions()).toEqual(newExpectedActions);
        });
      done();
    });
  });

  describe('Delete meal Items', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('delete meal items success', async (done) => {
      moxios.stubRequest(`${baseUrl}/admin/meal-items/${mealItems[0].id}`, {
        status: 200,
        response: {}
      });

      const expectedActions = [
        {
          type: DELETE_MEAL_ITEM_LOADING,
          payload: true,
        },
        {
          type: DELETE_MEAL_ITEM_SUCCESS,
          payload: mealItems[0].id
        },
        {
          type: DELETE_MEAL_ITEM_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});

      await store
        .dispatch(deleteMealItem(mealItems[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  
    it('delete meal item failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/admin/meal-items/${mealItems[0].id}`, {
        status: 401,
      });
  
      const expectedActions = [
        {
          type: DELETE_MEAL_ITEM_LOADING,
          payload: true,
        },
        {
          type: DELETE_MEAL_ITEM_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: DELETE_MEAL_ITEM_LOADING,
          payload: false,
        }
      ];
  
      const store = mockStore({});
  
      await store
        .dispatch(deleteMealItem(mealItems[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});
