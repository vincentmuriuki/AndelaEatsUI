import React, { Component } from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import Meal from "./Meal";
import MainMeal from "./MainMeal";
import Loader from "../common/Loader/Loader";
import { getOrderByDate } from "../../actions/ordersAction";
import { log } from "util";

/* eslint-disable */

const findSelected = meals => meals.find(meal => meal.selected);
const getMenu = (menus, date) => menus.find(meals => meals.date === date);

export class MealOptions extends Component {
  constructor() {
    super();
  }

  onChange = (mealId, checked, id) => {

    this.props.updateSelection(this.props.category, checked ? mealId : "", id);
  };

  render() {
    const { mealOptions = [], title, selectedMealId, category } = this.props;
    return (
      <div className="main-meal">
        <h3>{title}</h3>
        <ul>
          {mealOptions.map(meal =>
            category === "mainMeal" ? (
              <MainMeal
                meal={meal}
                key={meal.id}
                onChange={this.onChange}
                selectedMealId={selectedMealId}
                shouldHaveCheckBox={true}
              />
            ) : (
              <Meal
                meal={meal}
                key={meal.id}
                onChange={this.onChange}
                selectedMealId={selectedMealId}
                shouldHaveCheckBox={true}
              />
            )
          )}
        </ul>
      </div>
    );
  }
}

export class Menus extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      updated: false,
      mainMealId: false,
      menuId: ""
    };
  }

  queryEdit = (id, menus) => {
    const date = getMenu(menus, id) && getMenu(menus, id).date;

    this.props.getOrderByDate(date).then(() => {
      const foundId = this.props.menu.id;

      if (foundId) {
        const { main, proteinItems, sideItems } = this.props.menu.meal;
        const selectedMain = findSelected(main);
        const selectedAcc1 = findSelected(proteinItems);
        const selectedsides = findSelected(sideItems);

        this.updateSelection("mainMeal", selectedMain.id);
        this.updateSelection("acc1", selectedAcc1.id);
        this.updateSelection("acc2", selectedAcc2.id);

        this.setState({
          mainMeal: selectedMain && selectedMain.id,
          acc1: selectedAcc1 && selectedAcc1.id,
          acc2: selectedAcc2 && selectedAcc2.id,
          updated: false
        });
      }
    });
  };

  /**
   * Resets Menus to default.
   *
   * @memberof Menus
   */
  resetMenus = () => {
    this.props.resetMenu();
    this.setState({
      selectedMainMealId: "",
      mainMeal: "",
      proteins: "",
      sides: ""
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.queryEdit(id, this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const { id } = nextProps.match.params;
      this.queryEdit(id, nextProps.data);
      this.setState({
        updated: false
      });
    }
  }

  updateSelection = (mealCategory, mealId, id) => {
    this.props.selectMeal({ prop: mealCategory, value: mealId });

    this.setState({ [mealCategory]: mealId, updated: true });
    if (mealCategory === "mainMeal") {
      this.props.setSelectedMenu(id)
      this.setState({ menuId: id });
    }
  };

  render() {
    const {
      menu: { id },
      match,
      data,
      toggleModal,
      isLoading
    } = this.props;

    const { updated, mainMeal, proteins, sides, menuId, acc1, acc2 } = this.state;
    
    const menusLists = getMenu(data, match.params.date);

    const newList = menusLists.menus.filter(menu => menu.id === menuId);

    
    return (
      <div>
        {isLoading && <Loader />}
        <div className={`menus-container ${isLoading && "blurred"}`}>
          {menusLists.menus.length > 0 ? (
            <div>
              <h3>{`${id ? "Edit" : "New"} Order`}</h3>
              <MealOptions
                category="mainMeal"
                title="Main Meal"
                mealOptions={menusLists.menus}
                selectedMealId={mainMeal}
                updateSelection={this.updateSelection}
              />
              {newList.length > 0 && (
                <div>
                  <MealOptions
                    category="acc1"
                    title="Side Meal"
                    mealOptions={newList[0].sideItems}
                    selectedMealId={acc1}
                    updateSelection={this.updateSelection}
                  />
                  <MealOptions
                    category="acc2"
                    title="Protein Meal"
                    mealOptions={newList[0].proteinItems}
                    selectedMealId={acc2}
                    updateSelection={this.updateSelection}
                  />
                </div>
              )}

              <div className="cta">
                <div className="float-left" />
                <div className="float-right">
                  {!id && (
                    <div className="btn reset-order" onClick={this.resetMenus}>
                      reset order
                    </div>
                  )}
                  <button
                    disabled={!updated}
                    className={`btn submit-order ${!updated && "isDisabled"}`}
                    onClick={() => toggleModal(id)}
                  >
                    {`${id ? "update" : "submit"} order`}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div> No options available </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ orders: { isLoading, menu } }) {
  return {
    menu,
    isLoading
  };
}

Menus.propTypes = {
  match: PropType.object,
  data: PropType.array
};
export default connect(
  mapStateToProps,
  { getOrderByDate }
)(Menus);
