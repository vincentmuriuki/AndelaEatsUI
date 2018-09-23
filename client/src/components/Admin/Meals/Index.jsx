import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MealCard from './MealCard';
import Loader from '../../common/Loader/Loader';
import {
  fetchMealItems,
  showAddMealModal
} from '../../../actions/admin/mealItemsAction';
import AddMealModal from './AddMealModal/Index';

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
      name={meal.name}
      image={meal.image}
      category={meal.mealType}
    />
  );

  toggleAddModal() {
    const { addModalShow } = this.props;
    this.props.showAddMealModal(!addModalShow);
  }

  render() {
    const { addModalShow, isLoading, meals } = this.props;

    return (
      <Fragment>
        <AddMealModal
          toggleAddModal={this.toggleAddModal}
          show={addModalShow}
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
              { !isLoading && !meals.length && (
                <div className="no-content">No meal has been added yet :-(</div>
              )}
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
  addModalShow: mealItems.addMealModal.show
});

const mapDispatchToProps = {
  fetchMealItems,
  showAddMealModal
};

Meals.propTypes = {
  fetchMealItems: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showAddMealModal: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape({})),
  addModalShow: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
