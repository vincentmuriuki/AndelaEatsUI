import React, { Component } from 'react';
import PropType from 'prop-types';
import Meal from './Meal';
/* eslint-disable */


class MealOptions extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(mealId, checked) {
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
          selectedMealId={selectedMealId} />
        )}
        </ul>
      </div>
    );
  }
}

class Menus extends Component {
  constructor() {
    super();
    this.state = {};
    this.updateSelection = this.updateSelection.bind(this);
  }

  updateSelection(mealCategory, mealId) {
    this.setState({ [mealCategory]: mealId });
  }
  

  render () {
    const { match, data } = this.props;
  
    const menus = data.find(meals => meals.id === Number(match.params.id));
    let mainMeal = [];
    let firstAccompaniment;
    let secondAccompaniment;
    if (menus) {
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
              <div className="btn reset-order">reset order</div>
              <div className="btn submit-order">submit order</div>
            </div>
            </div>
           </div> : <div>No meals have been posted yet</div>}
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
