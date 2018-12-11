import { GET_ADMIN_USER } from "../../actions/actionTypes";
import { initialUserRole } from '../initialState';

const adminUserReducer = (state = initialUserRole, action) => {
    switch (action.type) {
      case GET_ADMIN_USER:
        return {
					...state,
					role: action.payload
					};
      default:
        return state;
    }
  };

  export default adminUserReducer;
