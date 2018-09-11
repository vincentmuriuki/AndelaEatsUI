import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "../Navbar/Navbar";
import { isAuthorized, isAdmin } from "../../../helpers/authorization";

/**
 *
 *
 * @class SideNav
 * @extends {Component}
 */
class SideNav extends Component {
  checkAdmin = () => this.props.location.pathname.includes('admin');

  render() {
    const { children, location: { pathname } } = this.props;

    const homeActive = (section) => pathname.includes(`/${section}`);

    if (!isAuthorized()) {
      return <Redirect to="/" />;
    }

    let sideBarComponent;

    if (!this.checkAdmin()) {
      sideBarComponent = (
        <ul className="side-nav-item-wrapper">
          <Link to="/ordermeal">
            <li className={`side-nav-item home
            ${homeActive('ordermeal') && "active"}`}
            >
              <span>Home</span>
            </li>
          </Link>
          <Link to="/orders">
            <li className={`side-nav-item home
              ${homeActive('orders') && "active"}`}
            >
              <span>Orders</span>
            </li>
          </Link>
        </ul>
      );
    } else {
      sideBarComponent = (
        <ul className="side-nav-item-wrapper">
          <Link to="/admin/orders">
            <li className={`side-nav-item order
            ${homeActive('admin/orders') && "active"}`}
            >
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/admin/vendors">
            <li className={`side-nav-item vendors
              ${homeActive('admin/vendors') && "active"}`}
            >
              <span>Vendors</span>
            </li>
          </Link>
        </ul>
      );
    }

    return (
      <div className="wrapper">
        <Navbar 
          isAdmin={isAdmin()} 
          adminDashboard={this.props.location.pathname.includes('admin')} 
        />
        <div className="push-down">
          <div className="side-nav">
            { sideBarComponent }
          </div>
          <div className="main-container">
            <div className="section">{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

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
