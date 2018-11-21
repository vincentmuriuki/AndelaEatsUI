import React, { Component } from "react";
import { format } from "date-fns";
import classname from "classnames";

import Meal from "./Meal";

/* eslint-disable */

/**
 *
 *
 * @class ConfirmOrder
 * @extends {Component}
 */
class ConfirmOrder extends Component {
  confirmOrder = () => {
    const {
      orderMeal,
      showToast,
      toggleModal,
      menuId,
      updateOrder,
      isLoading
    } = this.props;
    if (menuId) {
      // Updating an already created order
      updateOrder(this.props.mealSelected, menuId).then(() => {
        toggleModal();
      });
    } else {
      // Creating a new order
      orderMeal(this.props.mealSelected)
        .then(() => {
          showToast();
          toggleModal();
        })
        .catch(() => {
          showToast();
        });
    }
  };

  render() {
    const {
      isModalOpen,
      toggleModal,
      menus,
      match,
      mealSelected,
      isLoading
    } = this.props;
    let mainMeal;
    let proteinItems;
    let sideItems;
    let date;
    const menu = menus.find(meals => meals.id === Number(match.params.id));
    if (menu) {
      mainMeal = Object.values(menu.mainMeal).find(
        meal => meal.id === mealSelected.mainMeal.id
      );
      proteinItems = menu.proteinItems.map(meal =>
        Object.values(meal).find(meal => meal.id === mealSelected.proteins)
      );
      sideItems = menu.sideItems.map(meal =>
        Object.values(meal).find(meal => meal.id === mealSelected.sideItems)
      );
      date = menu.date;
    }
    return (
      <div
        id="confirm-order-modal"
        className={`modal ${isLoading && "blurred"}`}
        style={isModalOpen ? { display: "block" } : { display: "none" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">CONFIRM ORDER</div>
            <div className="header-date">
              <span className="label date-label">Order Date:</span>
              <span className="order-date">
                {" "}
                <b>{format(date, "dddd d MMMM")}</b>
              </span>
            </div>
          </div>

          <div className="order-details-label">Order Details</div>

          <div className="menus-container">
            <div className="main-meal">
              <ul>
                {mainMeal ? (
                  <div>
                    <div className="label meal-title">Main Meal</div>
                    <Meal meal={mainMeal} shouldHaveCheckBox={false} />
                  </div>
                ) : (
                  ""
                )}
                {proteinItems ? (
                  <div>
                    <div className="meal-title">Accompaniment 1</div>
                    <Meal meal={proteinItems} shouldHaveCheckBox={false} />
                  </div>
                ) : (
                  ""
                )}
                {sideItems ? (
                  <div>
                    <div className="meal-title">Accompaniment 2</div>
                    <Meal meal={sideItems} shouldHaveCheckBox={false} />
                  </div>
                ) : (
                  ""
                )}
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="grayed"
                onClick={toggleModal.bind(this)}
              >
                Cancel
              </button>
              <button
                className={classname("fill", { isDisabled: isLoading })}
                onClick={this.confirmOrder}
              >
                Confirm order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmOrder;
