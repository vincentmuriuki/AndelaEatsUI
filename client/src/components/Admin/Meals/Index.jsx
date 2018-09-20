import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MealCard from './MealCard';
import { AddMealModal } from './AddMealModal';
import Loader from '../../common/Loader/Loader';
import { fetchMealItems } from '../../../actions/admin/mealItemsAction';

/**
 * 
 * @description Meals component visible only to admin
 * 
 * @name Meals
 * 
 * @extends Component
 */
export class Meals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalShow: false
    };

    this.toggleAddModal = this.toggleAddModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchMealItems();
  }

  /**
   * @method renderMeal
   *
   * @memberof Meals
   *
   * @param {object} meal
   *
   * @returns {JSX}
   */
  renderMeal = (meal) => (
    <MealCard
      key={meal.id}
      name={meal.nameOfMeal}
      image={meal.image}
      category={meal.mealType}
    />
  );

  toggleAddModal() {
    const { addModalShow } = this.state;
  
    this.setState({
      addModalShow: !addModalShow
    });
  }

  render() {
    const { isLoading, meals } = this.props;

    if (!isLoading && !meals.length) {
      return (
        <div className="no-content">No meal has been added yet :-(</div>
      );
    }

    return (
      <Fragment>
        <AddMealModal
          toggleAddModal={this.toggleAddModal}
          show={this.state.addModalShow}
        />
        { isLoading && (<Loader />) }
        <div className={`${isLoading && 'blurred'}`} id="admin-meals">
          <header>
            <div>
              <span className="title pull-left">Meals</span>
              <button
                className="pull-right"
                type="button"
                onClick={this.toggleAddModal}
              >
                Add meal
              </button>
            </div>
          </header>
          
          <main>
            <div>
              { meals.map((meal) => this.renderMeal(meal)) }
            </div>
          </main>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ mealItems }) => ({
  meals: mealItems.meals,
  isLoading: mealItems.isLoading,
});

Meals.propTypes = {
  fetchMealItems: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(mapStateToProps, { fetchMealItems })(Meals);
