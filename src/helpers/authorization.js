// User info
import decodeToken from './jwtDecode';

/**
 * This function validates the user information
 *
 * @return {boolean} boolean
 */
export const isAuthorized = () => {
  if (decodeToken() !== 'unauthorised') {
    const userEmailAddress = (decodeToken().email);
    const andelaEmailRegex = /@andela.com$/;
    if (!andelaEmailRegex.test(userEmailAddress)) {
      document.cookie = '';
      localStorage.setItem('error', 
        'Unauthorised Access, Please Log in with an Andela Email');
      return false;
    }
    return true;
  }
};