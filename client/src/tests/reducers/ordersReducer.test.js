import { orders } from "../../reducers/initialState";
import ordersReducer from "../../reducers/ordersReducer";
import {
  FETCH_ORDERS_LOADING, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE, FETCH_FILTERED_ORDERS
} from "../../actions/actionTypes";

/* 
global jest 
expect 
*/
describe('Past Orders Reducer', () => {
  describe('FETCH_ORDERS_* action group', () => {
    it('_LOADING :: should set isLoading property', () => {
      const action = {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      };
      const newState = ordersReducer(orders, action);
      expect(newState.isLoading).toEqual(true);
    });
    it('_SUCCESS :: should set orders properties', () => {
      const action = {
        type: FETCH_ORDERS_SUCCESS,
        orders: {
          totalRecords: 1,
          currentPage: 1,
          meals: [{ name: "sweet food" }]
        }
      };
      const newState = ordersReducer(orders, action);
      expect(newState.currentPage).toEqual(1);
      expect(newState.meals).toEqual(action.orders.meals);
    });
    it('_FAILURE :: should set error property/properties', () => {
      const action = {
        type: FETCH_ORDERS_FAILURE,
        error: new Error("Unable to fetch data")
      };
      const newState = ordersReducer(orders, action);
      expect(newState.error).toEqual(action.error);
    });
  });

  describe('FETCH_FILTERED_ORDERS action', () => {
    it('should set filtered orders when successful', () => {
      const action = {
        type: FETCH_FILTERED_ORDERS,
        orders: {
          totalRecords: 1,
          currentPage: 1,
          meals: [{ name: "sweet food" }]
        }
      };
      const newState = ordersReducer(orders, action);
      expect(newState.currentPage).toEqual(1);
      expect(newState.meals).toEqual(action.orders.meals);
      expect(newState.isFiltered).toEqual(true);
    });
  });

  it('should return default state for unlisted initial state/action type', () => { //eslint-disable-line
    const action = {
      type: 'FETCH_ME',
    };
    const newState = ordersReducer(undefined, action);
    expect(newState).toEqual(orders);
  });
});
