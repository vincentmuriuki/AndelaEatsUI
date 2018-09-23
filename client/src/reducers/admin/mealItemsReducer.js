import {
  FETCH_MEAL_ITEMS_LOADING,
  FETCH_MEAL_ITEMS_SUCCESS,
  FETCH_MEAL_ITEMS_FAILURE,
  SET_ADD_MEAL_ERRORS,
  SET_ADD_MEAL_LOADING,
  ADD_MEAL_ITEM_SUCCESS,
  SHOW_ADD_MEAL_MODAL
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
    case SET_ADD_MEAL_ERRORS:
      return {
        ...state,
        addMealModal: {
          ...state.addMealModal,
          errors: action.payload
        }
      };
    case SHOW_ADD_MEAL_MODAL:
      return {
        ...state,
        addMealModal: {
          ...state.addMealModal,
          show: action.payload
        }
      };
    case SET_ADD_MEAL_LOADING:
      return {
        ...state,
        addMealModal: {
          ...state.addMealModal,
          isLoading: action.payload,
          addBtnDisabled: action.payload
        }
      };
    case ADD_MEAL_ITEM_SUCCESS:
      return {
        ...state,
        meals: [action.payload, ...state.meals]
      };
    default:
      return state;
  }
};

export default mealItemsReducer;
