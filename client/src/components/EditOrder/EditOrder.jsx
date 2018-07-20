import React, { Component } from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import PropType from "prop-types";
import { editOrder } from "../../actions/ordersAction";
import MealOptions from "./MealOptions";

/**
 *
 *
 * @class EditOrder
 * @extends {Component}
 */
export class EditOrder extends Component {
  state = {
    main: "Beans",
    firstAccompaniment: "Stew",
    secondAccompaniment: "Cake"
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.editOrder(id);
  }

  handleOptionChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { main, firstAccompaniment, secondAccompaniment } = this.props.menu.meal;

    return (
      <div className="wrapper">
        <div className="orders-wrapper">
          <h3>Edit Order</h3>

          <div className="orders-container">
            <div className="date-wrapper">
              <h3>{format(Date.now(), "MMMM YYYY")}</h3>
              <ul>
                <li className="active">
                  {format(this.props.menu.date, "dddd Do")}
                </li>
              </ul>
            </div>
            <form onSubmit={this.handleFormSubmit}>
              <div className="menu-wrapper">
                <div className="menus-container">
                  <div className="main-meal">
                    <h3>Main Meal</h3>
                    <ul>
                      {main.map(meal => (
                        <MealOptions
                          key={meal.id}
                          name="main"
                          meal={meal}
                          selectedMealId={this.state.main}
                          handleOptionChange={this.handleOptionChange}
                        />
                      ))}
                    </ul>
                    <h3>Accompaniment 1</h3>
                    <ul>
                      {firstAccompaniment.map(meal => (
                        <MealOptions
                          key={meal.id}
                          name="firstAccompaniment"
                          meal={meal}
                          selectedMealId={this.state.firstAccompaniment}
                          handleOptionChange={this.handleOptionChange}
                        />
                      ))}
                    </ul>
                    <h3>Accompaniment 2</h3>
                    <ul>
                      {secondAccompaniment.map(meal => (
                        <MealOptions
                          key={meal.id}
                          name="secondAccompaniment"
                          meal={meal}
                          selectedMealId={this.state.secondAccompaniment}
                          handleOptionChange={this.handleOptionChange}
                        />
                      ))}
                    </ul>
                  </div>
                  <div className="cta">
                    <div className="float-right">
                      <div className="btn reset-order">cancel</div>
                      <button className="btn submit-order" type="submit">
                        save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditOrder.propTypes = {
  match: PropType.object,
  menu: PropType.object,
  editOrder: PropType.func
};

/**
 * connect to redux store
 * @param {state} state
 * @returns {object} menus
 */
function mapStateToProps(state) {
  return { menu: state.orders.menu };
}

export default connect(
  mapStateToProps,
  { editOrder }
)(EditOrder);
