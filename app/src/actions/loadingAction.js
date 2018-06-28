import { IS_LOADING } from './actionTypes';

export const loadingAction = status => {
  return {
    type: IS_LOADING,
    payload: status
  }
};
