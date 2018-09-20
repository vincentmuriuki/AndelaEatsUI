import {
  FETCH_MEAL_ITEMS_LOADING,
  FETCH_MEAL_ITEMS_SUCCESS,
  FETCH_MEAL_ITEMS_FAILURE,
} from '../../actions/actionTypes';

import { initialMealItems } from '../initialState';

const mealItemsReducer = (state = initialMealItems, action) => {
  switch (action.type) {
    case FETCH_MEAL_ITEMS_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_MEAL_ITEMS_SUCCESS:
      return { ...state, meals: action.payload };
    case FETCH_MEAL_ITEMS_FAILURE:
      return state;
    default:
      return state;
  }
};

export default mealItemsReducer;
