import React, { Component } from 'react';
import logo from '../../assets/images/logo.png';
import backgroundImg 
  from '../../assets/images/google-logo-icon-PNG-Transparent-Background.png';

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
              <div className="login-button">
                LOGIN WITH GOOGLE
              </div>
            </div>
          </div>
          <div className="login-picture-frame" />
        </div>
      </div>
    );
  }
}

export default Login;
