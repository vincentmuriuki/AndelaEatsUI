import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthorized } from '../../helpers/authorization';
import Navbar from '../../common/Navbar/Navbar';
import Sidenav from '../../common/Sidenav/Sidenav';


/**
 * Application order page
 * @return {object} jsx
 */
const OrderPage = () => {
  if (!isAuthorized()) return <Redirect to="/" />;
  return (
    <div className="wrapper">
      <Navbar />
      <Sidenav />
    </div>
  );
};

export default OrderPage;
