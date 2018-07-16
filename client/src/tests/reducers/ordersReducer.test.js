import { orders } from "../../reducers/initialState";
import ordersReducer from "../../reducers/ordersReducer";
import { 
  FETCH_ORDERS_LOADING, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE 
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

  it('should retutn default state for unlisted initial state/action type', () => {
    const action = {
      type: 'FETCH_ME',
    };
    const newState = ordersReducer(undefined, action);
    expect(newState).toEqual(orders);
  });
});
