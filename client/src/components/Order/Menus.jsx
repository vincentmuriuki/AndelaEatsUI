import React, { Component } from 'react';
import PropType from 'prop-types';
import Meal from './Meal';
import Loader from '../common/Loader/Loader';

/* eslint-disable */


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
      isLoading: true
    };
  }

  /**
   * sets selected menu to state
   *
   * @memberof Menus
   */
  updateSelection = (mealCategory, mealId) => {
    this.props.selectMeal({ prop: mealCategory, value: mealId });
    this.setState({ [mealCategory]: mealId });
  }
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
  

  render () {
    const { match, data, toggleModal } = this.props;
  
    const menus = data.find(meals => meals.id === Number(match.params.id));
    let mainMeal = [];
    let firstAccompaniment;
    let secondAccompaniment;
    if (menus){
      mainMeal = menus.meal.main;
      firstAccompaniment = menus.meal.firstAccompaniment;
      secondAccompaniment = menus.meal.secondAccompaniment;
    }

    return (
      <div>
        <div className="menus-container">
         { mainMeal.length > 0 ? <div>
            <MealOptions
              category="mainMeal"
              title="Main Meal"
              mealOptions={mainMeal}
              selectedMealId={this.state.mainMeal}
              updateSelection={this.updateSelection}
            />
            <MealOptions
              category="acc1"
              title="Accompaniment 1"
              mealOptions={firstAccompaniment}
              selectedMealId={this.state.acc1}
              updateSelection={this.updateSelection}
            />
            <MealOptions
              category="acc2"
              title="Accompaniment 2"
              mealOptions={secondAccompaniment}
              updateSelection={this.updateSelection}
              selectedMealId={this.state.acc2}
            />
            <div className="cta">
            <div className="float-left"></div>
            <div className="float-right">
              <div className="btn reset-order" onClick={this.resetMenus}>reset order</div>
              <div className="btn submit-order" onClick={toggleModal.bind(this)}>submit order</div>
            </div>
            </div>
           </div> : <div>No Available options yet</div>
          }
        </div>
      </div>
    )
  }
}


Menus.propTypes = {
  match: PropType.object,
  data: PropType.array
};
export default Menus;
