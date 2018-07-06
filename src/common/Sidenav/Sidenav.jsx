import React from 'react';
import { Link } from 'react-router-dom';


const SideNav = (props) => (
  <div className="side-nav">
    <ul className="side-nav-item-wrapper">
      <a href="#">
        <li className="side-nav-item active home">
          <span>Home</span>
        </li>
      </a>
      <a href="#">
        <li className="side-nav-item order">
          <span>Home</span>
        </li>
      </a>
    </ul> 
  </div>
);

export default SideNav;
