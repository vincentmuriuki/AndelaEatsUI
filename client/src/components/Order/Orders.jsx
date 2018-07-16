import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Redirect, Route, NavLink } from 'react-router-dom';
import PropType from 'prop-types';

import Menus from './Menus';
import { getUpComingMenus } from '../../actions/menuAction';
import canOrderMeal from '../../helpers/canOrderMeal';

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
    this.state = {
      endDate: new Date().getDate() + 7
    };
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
      return this.props.menus.map((menuDate) => {
        if (new Date(menuDate.date).getDate() >= new Date().getDate() 
            && new Date(menuDate.date).getDate() <= this.state.endDate) {
          return (
            <li 
              key={menuDate.id} 
              className={canOrderMeal(menuDate) ? "dates" : 'dates-disable'}
            >
              <NavLink
                activeClassName={canOrderMeal(menuDate) 
                  ? "active" : 'isDisabled'}
                
                to={canOrderMeal(menuDate) 
                  ? `${this.props.match.url}/${menuDate.id}` : '#'}
              >
                {moment(menuDate.date).format('dddd Do')}
              </NavLink>
              <div className="border-circle" />
            </li>
          );
        }
        return false;
      });
    }
  }


  render() {
    const { match: { url }, menus } = this.props;
    return (
      <div className="wrapper">
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
