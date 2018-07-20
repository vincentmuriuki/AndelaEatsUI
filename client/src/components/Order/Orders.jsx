import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Redirect, Route, NavLink } from 'react-router-dom';
import PropType from 'prop-types';

import Menus from './Menus';
import { getUpComingMenus } from '../../actions/menuAction';
import canOrderMeal from '../../helpers/canOrderMeal';


const validateDate = (menu, endDate) => new Date(menu.date).getDate() <= endDate
  && new Date(menu.date).getDate() >= new Date().getDate();

/**
 *
 *
 * @class Orders
 * @extends {Component}
 */
export class Orders extends Component {
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

  componentDidMount() {
    this.props.getUpComingMenus()
      .then(() => {
        this.selectDefaultMenu();
      });
  }

  selectDefaultMenu() {
    const selectedMeal = this.props.menus.find(menu => canOrderMeal(menu)
      && validateDate(menu, this.state.endDate)
    );

    this.context.router.history
      .push(`${this.props.match.url}/${selectedMeal.id}`);
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
        if (validateDate(menuDate, this.state.endDate)) {
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
                {format(menuDate.date, 'dddd Do')}
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
                {format(Date.now(), "MMMM YYYY")}
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

Orders.contextTypes = {
  router: PropType.object.isRequired
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
