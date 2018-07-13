import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Redirect, Route, NavLink } from 'react-router-dom';
import PropType from 'prop-types';
import Menus from './Menus';
import { getUpComingMenus } from '../../actions/ordersAction';
import Navbar from '../common/Navbar/Navbar';
import Sidenav from '../common/Sidenav/Sidenav';
import { isAuthorized } from '../../helpers/authorization';


/**
 *
 *
 * @class Orders
 * @extends {Component}
 */
class Orders extends Component {
  /**
   *Creates an instance of Orders.
   * @param {*} props
   * @memberof Orders
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.getUpComingMenus();
  }

  /**
   *
   *
   * @returns {void}
   * @memberof Orders
   */
  renderDates() {
    if (this.props.menus) {
      return this.props.menus.map((currentDate) => (
        <li key={currentDate.id} className="dates">
          <NavLink
            activeClassName="active"
            to={`${this.props.match.url}/${currentDate.id}`}
            className="date-link"
          >
            {moment(currentDate.date).format('dddd Do')}
          </NavLink>
          <div className="border-circle" />
        </li>
      ));
    }
  }


  render() {
    if (!isAuthorized()) return <Redirect to="/" />;
    const { match: { url }, menus } = this.props;
    return (
      <div className="wrapper">
        <Navbar />
        <Sidenav />
        <div className="orders-wrapper">
          <h3>Make Orders</h3>

          <div className="orders-container">
            <div className="date-wrapper">
              <h3>
                {moment(Date.now()).format("MMMM YYYY")}
              </h3>
              <ul>
                {this.renderDates()}
              </ul>
            </div>
            <div className="menu-wrapper">
              <Route
                path={`${url}/:id`}
                render={(props) => <Menus data={menus} {...props} />}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Orders.propTypes = {
  match: PropType.object,
  menus: PropType.array,
  getUpComingMenus: PropType.func
};

/**
 * connect to redux store
 * @param {state} state
 * @returns {object} menus
 */
function mapStateToProps(state) {
  return { menus: state.upcomingMenus };
}

export default connect(mapStateToProps, { getUpComingMenus })(Orders);
