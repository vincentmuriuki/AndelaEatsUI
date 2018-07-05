import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import logo from '../../assets/images/logo.png';
import 
backgroundImg 
  from '../../assets/images/google-logo-icon-PNG-Transparent-Background.png';

// configuration
import { config } from '../../config';

// helper
import checkLogin from '../../helpers/checkLogin';

// style
import '../../assets/scss/font.scss';

/**
 * 
 * This is class method that handles signin logic
 * @export
 * @class SigninForm
 * @extends {React.Component}
 */
class Login extends Component {
  /**
   * Creates an instance of login form
   * @param {any} props -
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 
   * This is React render method that render the UI on the dom
   * @function SigninForm
   * @return { void }
   */
  render() {
    const redirectUrl = `${config.ANDELA_API_BASE_URL}/login?redirect_url=${config.BASE_URL}`;
    const options = {
      autoClose: false,
      hideProgressBar: true,
    };

    const getUrlError = location.href.split('error=');
    const storeLoginError = localStorage.setItem('error', getUrlError[1]);
    const loginError = localStorage.getItem('error');
    const token = document.cookie.split('jwt-token=');
    const message = 'Unauthorised Access, Please Log in with an Andela Email';

    // Display Login Error
    if (loginError !== 'undefined') {
      toast(
        <div id="toaster">
          {message}
        </div>,
        options);
      localStorage.clear();
    }

    if (checkLogin()) {
      return <Redirect to="/ordermeal" />;
    }
    return (
      <div className="main-wrapper">
        <div className="grid-container">
          <div className="login-input-frame">
            <div className="logo-container">
              <img src={logo} alt="logo" width="60" height="60" />
              <div className="logo-name">
                  AndelaEats
              </div>
            </div>
            <div className="login-page-caption">
                A convinent way to 
              <br /> 
                order your meals
            </div>
            <div className="google-button">
              <div className="google-img">
                <img 
                  src={backgroundImg}
                  alt="google-logo"
                />
              </div>
              <a href={redirectUrl}>
                <div className="login-button">
                  LOGIN WITH GOOGLE
                </div>
              </a>
            </div>
            <ToastContainer />
          </div>
          <div className="login-picture-frame" />
        </div>
      </div>
    );
  }
}
export default Login;
