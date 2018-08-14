import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import { Route, NavLink } from 'react-router-dom';
import PropType from 'prop-types';

import Menus from './Menus';
import {
  getUpComingMenus,
  selectMeal,
  orderMeal,
  resetMenu
} from '../../actions/menuAction';
import { canOrderMeal, validateDate, endDate } from '../../helpers/mealsHelper';
import ConfirmOrder from './ConfirmOrder';
import Loader from '../common/Loader/Loader';


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
      isModalOpen: false,
      isLoading: true
    };
  }

  componentDidMount() {
    this.props.getUpComingMenus()
      .then(() => {
        this.setState({ isLoading: false });
        this.selectDefaultMenu();
      });
  }

  showToast = () => {
    toast.success(this.props.message, {
      position: toast.POSITION.TOP_CENTER
    });
  }

  toggleModal = () => {
    const { acc1, acc2, mainMeal } = this.props.mealSelected;
    if (acc1 !== '' && acc2 !== '' && mainMeal !== '') {
      this.setState(state => ({
        isModalOpen: !state.isModalOpen,
      }));
    }
  }

  selectDefaultMenu() {
    const selectedMeal = this.props.menus.find(menu => canOrderMeal(menu)
      && validateDate(menu, endDate())
    );

    this.context.router.history
      .push(`${this.props.match.url}/${selectedMeal && selectedMeal.id}`);
  }

  /**
   *
   *
   * @returns {void}
   * @memberof Orders
   */
  renderDates() {
    if (this.props.menus) {
      return this.props.menus.map((menuDate) => validateDate(menuDate, endDate()) && (
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
      ));
    }
  }


  render() {
    const {
      match: { url },
      menus, selectMeal, mealSelected, orderMeal, resetMenu, isLoading //eslint-disable-line
    } = this.props;
    return (
      <div className="wrapper">
        {this.state.isLoading ? <Loader />
          : (
            <div className="orders-wrapper">
              <ToastContainer
                autoClose={2000}
                pauseOnHover={false}
                hideProgressBar
              />
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
                    render={(props) => (
                      <div>
                        <Menus
                          data={menus}
                          toggleModal={this.toggleModal}
                          selectMeal={selectMeal}
                          resetMenu={resetMenu}
                          mealSelected={mealSelected}
                          {...props}
                        />
                        <ConfirmOrder
                          toggleModal={this.toggleModal}
                          isModalOpen={this.state.isModalOpen}
                          menus={menus}
                          mealSelected={mealSelected}
                          orderMeal={orderMeal}
                          showToast={this.showToast}
                          isLoading={isLoading}
                          {...props}
                        />
                      </div>
                    )
                    }
                  />
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

Orders.propTypes = {
  getUpComingMenus: PropType.func,
  isLoading: PropType.bool,
  match: PropType.object,
  mealSelected: PropType.object,
  menus: PropType.array,
  message: PropType.string,
  orderMeal: PropType.func.isRequired,
  resetMenu: PropType.func.isRequired,
  selectMeal: PropType.func.isRequired
};

Orders.contextTypes = {
  router: PropType.object.isRequired
};

/**
 * connect to redux store
 * @param {state} state
 * @returns {object} menus
 */
function mapStateToProps({ upcomingMenus }) {
  const {
    menus, acc1, acc2, mainMeal, message, isLoading
  } = upcomingMenus;

  const mealSelected = {
    mainMeal,
    firstAccompaniment: acc1,
    secondAccompaniment: acc2,
  };
  return {
    menus, mealSelected, message, isLoading
  };
}

export default connect(mapStateToProps,
  {
    getUpComingMenus,
    selectMeal,
    orderMeal,
    resetMenu
  })(Orders);
