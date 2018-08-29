import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import { isAuthorized } from '../../../helpers/authorization';

const SideNav = ({ children, location: { pathname } }) => {
  const homeActive = !pathname.includes("/orders");
  if (!isAuthorized()) {
    return <Redirect to="/" />;
  }

  return (
    <div className="wrapper">
      <Navbar />
      <div className="push-down">
        <div className="side-nav">
          <ul className="side-nav-item-wrapper">
            <Link to={`${!homeActive && '/ordermeal'}`}>
              <li className={
                `side-nav-item home ${homeActive && "active disabled"}`
              }
              >
                <span>Home</span>
              </li>
            </Link>
            <Link to="/orders">
              <li className={
                `side-nav-item order ${!homeActive && "active disabled"}`
              }
              >
                <span>Orders</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className="main-container">
          <div className="section">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

SideNav.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  children: PropTypes.node.isRequired
};

SideNav.defaultProps = {
  location: {}
};

export default SideNav;
