import React, { Component } from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import { Route, NavLink } from "react-router-dom";
import PropType from "prop-types";

import Menus from "./Menus";
import {
  getUpComingMenus,
  selectMeal,
  orderMeal,
  resetMenu
} from "../../actions/menuAction";
import { canOrderMeal, validateDate, endDate } from "../../helpers/mealsHelper";
import ConfirmOrder from "./ConfirmOrder";
import Loader from "../common/Loader/Loader";
import { updateOrder } from "../../actions/ordersAction";
import { MockData } from "../../tests/__mocks__/mockMenuListData";

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
    this.props.getUpComingMenus().then(() => {
      this.setState({ isLoading: false });
      this.selectDefaultMenu();
    });
  }

  showToast = () => {
    toast.success(this.props.message, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  toggleModal = menuId => {
    const { acc1, acc2, mainMeal } = this.props.mealSelected;
    if (acc1 !== "" || acc2 !== "" || mainMeal !== "") {
      this.setState(state => ({
        isModalOpen: !state.isModalOpen,
        menuId
      }));
    }
  };

  selectDefaultMenu() {
    const selectedMeal = MockData.payload.menuList.find(
      menu => canOrderMeal(menu) && validateDate(menu, endDate())
    );
    this.context.router.history.push(
      `${this.props.match.url}/${selectedMeal && selectedMeal.id}`
    );
  }

  /**
   *
   *
   * @returns {void}
   * @memberof Orders
   */
  renderDates() {
    if (MockData) {
      return MockData.payload.menuList.map(
        menuDate =>
          validateDate(menuDate, endDate()) && (
            <li
              key={menuDate.id}
              className={canOrderMeal(menuDate) ? "dates" : "dates-disable"}
            >
              <NavLink
                activeClassName={
                  canOrderMeal(menuDate) ? "active" : "isDisabled"
                }
                to={
                  canOrderMeal(menuDate)
                    ? `${this.props.match.url}/${menuDate.id}`
                    : "#"
                }
              >
                {format(menuDate.date, "dddd Do")}
              </NavLink>
              <div className="border-circle" />
            </li>
          )
      );
    }
  }

  render() {
    const {
      match: { url },
      menus: { menuList },
      selectMeal,
      mealSelected,
      orderMeal,
      resetMenu,
      isLoading,
      updateOrder //eslint-disable-line
    } = this.props;

    return (
      <div className="wrapper">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div className="orders-wrapper">
            <ToastContainer
              autoClose={2000}
              pauseOnHover={false}
              hideProgressBar
            />
            <h3>Make Orders</h3>

            <div className="orders-container">
              <div className="date-wrapper">
                <h3>{format(Date.now(), "MMMM YYYY")}</h3>
                <ul>{this.renderDates()}</ul>
              </div>
              <div className="menu-wrapper">
                <Route
                  path={`${url}/:id`}
                  render={props => (
                    <div>
                      <Menus
                        data={MockData.payload.menuList}
                        toggleModal={this.toggleModal}
                        selectMeal={selectMeal}
                        resetMenu={resetMenu}
                        mealSelected={mealSelected}
                        {...props}
                      />
                      <ConfirmOrder
                        menuId={this.state.menuId}
                        toggleModal={this.toggleModal}
                        isModalOpen={this.state.isModalOpen}
                        menus={menuList}
                        mealSelected={mealSelected}
                        orderMeal={orderMeal}
                        updateOrder={updateOrder}
                        showToast={this.showToast}
                        isLoading={isLoading}
                        {...props}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Orders.propTypes = {
  getUpComingMenus: PropType.func,
  isLoading: PropType.bool,
  match: PropType.object,
  mealSelected: PropType.object,
  menus: PropType.object,
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
  const { menus, acc1, acc2, mainMeal, message, isLoading } = upcomingMenus;

  const mealSelected = {
    mainMeal,
    firstAccompaniment: acc1,
    secondAccompaniment: acc2
  };

  return {
    menus,
    mealSelected,
    message,
    isLoading
  };
}

const actionCreators = {
  getUpComingMenus,
  selectMeal,
  orderMeal,
  resetMenu,
  updateOrder
};

export default connect(
  mapStateToProps,
  actionCreators
)(Orders);
