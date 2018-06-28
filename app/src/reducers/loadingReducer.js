import { IS_LOADING } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return action.payload.status
    default:
      return state;
  }
};
