import React, { Component } from 'react';
import MealCard from './MealCard';

/**
 * 
 * @description Meals component visible only to admin
 * 
 * @name Meals
 * 
 * @extends Component
 */
class Meals extends Component {
  constructor(props) {
    super(props);

    /**
     * 
     * populate meals dummy array for design check
     * this should be removed first when loading meals from backend
     * and update test case that checks the number of loaded meals
     */
    this.dummyMeals = [];
    let index;
    for (index = 0; index < 8; index += 1) {
      this.dummyMeals.push({
        id: index,
        name: 'Ugeli',
        vendor: 'Kempiski',
        vendorUrl: 'https://www.google.com',
        category: 'Main meal',
        image: '../../../assets/images/side_img.jpg'
      });
    }
    
    this.state = {};
  }

  render() {
    return (
      <div id="admin-meals">
        <header>
          <div>
            <span className="title pull-left">Meals</span>
            <button className="pull-right" type="button">
              Add meal
            </button>
          </div>
        </header>
        
        <main>
          <div>
            { this.dummyMeals.map((meal) => (
              <MealCard
                key={meal.id}
                name={meal.name}
                image={meal.image}
                category={meal.category}
                vendor={{
                  name: meal.vendor,
                  url: meal.vendorUrl
                }}
              />
            )) }
          </div>
        </main>
      </div>
    );
  }
}

export default Meals;
