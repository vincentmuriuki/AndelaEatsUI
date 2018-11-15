import { 
  FETCH_VENDOR_ENGAGEMENT_LOADING, 
  FETCH_VENDOR_ENGAGEMENT_SUCCESS, 
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  CREATE_VENDOR_ENGAGEMENT_LOADING,
  CREATE_VENDOR_ENGAGEMENT_SUCCESS,
  CREATE_VENDOR_ENGAGEMENT_FAILURE,
  DELETE_VENDOR_ENGAGEMENT_LOADING,
  DELETE_VENDOR_ENGAGEMENT_SUCCESS,
  DELETE_VENDOR_ENGAGEMENT_FAILURE
} from '../../actions/actionTypes';

import { initialEngagements } from '../initialState';
import filter from '../../helpers/filter';

const engagementsReducer = (state = initialEngagements, action) => {
  switch (action.type) {
    case FETCH_VENDOR_ENGAGEMENT_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_VENDOR_ENGAGEMENT_SUCCESS:
      return { ...state, engagements: action.payload };
    case FETCH_VENDORS_SUCCESS:
      return { ...state, vendors: action.payload };
    case CREATE_VENDOR_ENGAGEMENT_LOADING:
      return { ...state, isCreating: action.payload };
    case CREATE_VENDOR_ENGAGEMENT_SUCCESS:
      return { ...state, engagements: [...state.engagements, action.payload] };
    case DELETE_VENDOR_ENGAGEMENT_LOADING:
      return { ...state, isDeleting: action.payload };
    case DELETE_VENDOR_ENGAGEMENT_SUCCESS: 
      return {
        ...state,
        engagements: filter(state.engagements, action.payload)
      };
    case FETCH_VENDOR_ENGAGEMENT_FAILURE:
    case FETCH_VENDORS_FAILURE:
    case CREATE_VENDOR_ENGAGEMENT_FAILURE:
    case DELETE_VENDOR_ENGAGEMENT_FAILURE:
      return state;
    default:
      return state;
  }
};

export default engagementsReducer;
