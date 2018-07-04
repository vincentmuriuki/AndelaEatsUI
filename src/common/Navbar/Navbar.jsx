import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/andela-logo.png';
import 
backgroundImg 
  from '../../assets/images/google-logo-icon-PNG-Transparent-Background.png';

const Navbar = (props) => (
  <header className="nav-bar">
    <div className="logo-wrapper">
      <div className="logo-img">
        <img src={logo} alt="logo" />
      </div>
      <div className="logo-name-global">AndelaEats</div>
    </div>
    <div className="nav-spacer" />
    <div className="profile-items">
      <div>
        <i className="far fa-bell bell" />
      </div>
      <div className ="profile-pics">
        <img src={backgroundImg} alt="profile-img" />
      </div>
      <div className="profile-name">ebuka.umeh</div>
      <div className="dropdown">
        <div className="arrow-down" />
        <div className="dropdown-content">
          <a href="#">Signout</a>
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
