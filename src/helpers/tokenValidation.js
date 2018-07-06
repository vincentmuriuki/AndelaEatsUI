import jwtDecode from 'jwt-decode';
import { isAuthorized } from './authorization';

const isValid = () => {
  const cookie = document.cookie;
  const token = cookie.split('jwt-token=');
  if (token.length === 2) {
    const jwtToken = token[1];
    const decodedToken = jwtDecode(jwtToken);
    const { exp } = decodedToken.exp;
    if (exp > Math.floor(new Date().getTime() / 1000)) {
      return true;
    } 
    return false;
  }
};

/**
 * Checks for the environment and then validates token
 *
 * @param {object} store 
 * @param {object} next
 * @param {object} action
 *
 * @returns {function} -  checkTokenStatus
 */
export const tokenValidator = store => next => action => {
  if (process.env.NODE_ENV !== 'test') {
    if (isValid()) {
      return next(action);
    }
    if (!isAuthorized()) {
      // window.location.href = "/";
    } 
    document.cookie = '';
    localStorage.setItem('error', 'Session has expired, kindly re-login');
    // window.location.href = "/";
  }
};
