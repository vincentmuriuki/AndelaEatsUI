import {
  FETCH_MEAL_ITEMS_LOADING,
  FETCH_MEAL_ITEMS_SUCCESS,
  FETCH_MEAL_ITEMS_FAILURE,
  SET_ADD_MEAL_ERRORS,
  SET_ADD_MEAL_LOADING,
  ADD_MEAL_ITEM_SUCCESS,
  SHOW_MEAL_MODAL,
  DELETE_MEAL_ITEM_LOADING,
  DELETE_MEAL_ITEM_SUCCESS,
  DELETE_MEAL_ITEM_FAILURE
} from '../../actions/actionTypes';
import filter from '../../helpers/filter';
import { initialMealItems } from '../initialState';

const mealItemsReducer = (state = initialMealItems, action) => {
  switch (action.type) {
    case FETCH_MEAL_ITEMS_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_MEAL_ITEMS_SUCCESS:
      return { ...state, meals: action.payload };
    case DELETE_MEAL_ITEM_LOADING:
      return { ...state, isDeleting: action.payload };
    case DELETE_MEAL_ITEM_SUCCESS:
      return {
        ...state,
        meals: filter(state.meals, action.payload)
      };
    case FETCH_MEAL_ITEMS_FAILURE:
    case DELETE_MEAL_ITEM_FAILURE:
      return state;
    case SET_ADD_MEAL_ERRORS:
      return {
        ...state,
        mealModal: {
          ...state.mealModal,
          errors: action.payload
        }
      };
    case SHOW_MEAL_MODAL:
      return {
        ...state,
        mealModal: {
          ...state.mealModal,
          show: action.payload
        }
      };
    case SET_ADD_MEAL_LOADING:
      return {
        ...state,
        mealModal: {
          ...state.mealModal,
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
