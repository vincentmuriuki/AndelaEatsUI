import { 
  FETCH_VENDOR_ENGAGEMENT_LOADING, 
  FETCH_VENDOR_ENGAGEMENT_SUCCESS, 
  FETCH_VENDOR_ENGAGEMENT_FAILURE
} from '../../actions/actionTypes';

import { initialEngagements } from '../initialState';

const engagementsReducer = (state = initialEngagements, action) => {
  switch (action.type) {
    case FETCH_VENDOR_ENGAGEMENT_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_VENDOR_ENGAGEMENT_SUCCESS:
      return { ...state, engagements: action.payload };
    case FETCH_VENDOR_ENGAGEMENT_FAILURE:
      return state;
    default:
      return state;
  }
};

export default engagementsReducer;
