import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from "react-redux";
import Meal from './Meal';
import Loader from '../common/Loader/Loader';
import { getOrderByDate } from "../../actions/ordersAction";

/* eslint-disable */

const findSelected = meals => meals.find(meal => meal.selected);
const getMenu = (menus, id) => menus.find(meals => meals.id === Number(id));

export class MealOptions extends Component {
  constructor() {
    super();
  }

  onChange = (mealId, checked) => {
    this.props.updateSelection(this.props.category, checked ? mealId : '');
  }

  render() {
    const { mealOptions = [], title, selectedMealId } = this.props;
    return (
      <div className="main-meal">
        <h3>{title}</h3>
        <ul>
          {mealOptions.map(meal =>
            <Meal
              meal={meal}
              key={meal.id}
              onChange={this.onChange}
              selectedMealId={selectedMealId}
              shouldHaveCheckBox={true}
            />
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
      updated: false
    };
  }

  queryEdit = (id, menus) => {
    const date = getMenu(menus, id) && getMenu(menus, id).date;

    this.props.getOrderByDate(date)
      .then(() => {
        const foundId = this.props.menu.id;

        if (foundId) {
          const { main, firstAccompaniment, secondAccompaniment } = this.props.menu.meal;
          const selectedMain = findSelected(main);
          const selectedAcc1 = findSelected(firstAccompaniment);
          const selectedAcc2 = findSelected(secondAccompaniment);

          this.updateSelection('mainMeal', selectedMain.id);
          this.updateSelection('acc1', selectedAcc1.id);
          this.updateSelection('acc2', selectedAcc2.id);

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
      mainMeal: '',
      acc1: '',
      acc2:''
    });
  }

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

  updateSelection = (mealCategory, mealId) => {
    this.props.selectMeal({ prop: mealCategory, value: mealId });
    this.setState({ [mealCategory]: mealId, updated: true });
  }


  render() {
    const { menu: { id }, match, data, toggleModal, isLoading } = this.props;
    const { updated, mainMeal, acc1, acc2 } = this.state;

    let main = [];
    let firstAccompaniment;
    let secondAccompaniment;

    const menus = getMenu(data, match.params.id);
    if (menus) {
      main = menus.meal.main;
      firstAccompaniment = menus.meal.firstAccompaniment;
      secondAccompaniment = menus.meal.secondAccompaniment;
    }

    return (
      <div>
        {isLoading && <Loader />}
        <div className={`menus-container ${isLoading && 'blurred'}`}>
          {main.length > 0 ? <div>
            <h3>{`${id ? 'Edit' : 'New'} Order`}</h3>
            <MealOptions
              category="mainMeal"
              title="Main Meal"
              mealOptions={main}
              selectedMealId={mainMeal}
              updateSelection={this.updateSelection}
            />
            <MealOptions
              category="acc1"
              title="Accompaniment 1"
              mealOptions={firstAccompaniment}
              selectedMealId={acc1}
              updateSelection={this.updateSelection}
            />
            <MealOptions
              category="acc2"
              title="Accompaniment 2"
              mealOptions={secondAccompaniment}
              updateSelection={this.updateSelection}
              selectedMealId={acc2}
            />
            <div className="cta">
              <div className="float-left"></div>
              <div className="float-right">
                {!id && <div className="btn reset-order" onClick={this.resetMenus}>reset order</div>}
                <button
                  disabled={!updated}
                  className={`btn submit-order ${!updated && 'isDisabled'}`}
                  onClick={() => toggleModal(id)}>{`${id ? 'update' : 'submit'} order`}
                </button>
              </div>
            </div>
          </div> : <div>No Available options yet</div>
          }
        </div>
      </div>
    )
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
export default connect(mapStateToProps, { getOrderByDate })(Menus);
