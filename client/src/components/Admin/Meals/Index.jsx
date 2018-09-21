import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import MealCard from './MealCard';
import Loader from '../../common/Loader/Loader';
import {
  fetchMealItems,
  showAddMealModal,
  deleteMealItem
} from '../../../actions/admin/mealItemsAction';
import AddMealModal from './AddMealModal/Index';
import DeleteMealModal from './DeleteMealModal';

/**
 * 
 * @description Meals component visible only to admin
 *
 * @class Meals
 *
 * @extends Component
 */
export class Meals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalShow: false,
      displayDeleteModal: false,
      modalContent: {}
    };
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
      id={meal.id}
      image={meal.image}
      name={meal.name}
      mealType={meal.mealType}
      showDeleteModal={this.showDeleteModal}
    />
  );

  toggleAddModal = () => {
    const { addModalShow } = this.state;
    this.props.showAddMealModal(!addModalShow);
    
    this.setState({
      addModalShow: !addModalShow
    });
  }

  /**
   * 
   * @method showDeleteModal
   * 
   * @param {object} mealDetails
   * 
   * @memberof Meals
   * 
   * @returns {void}
   */
  showDeleteModal = (mealDetails) => {
    this.setState({
      modalContent: mealDetails,
      displayDeleteModal: true
    });
  }

  /**
   * 
   * @method deleteMealItem
   * 
   * @param {object} mealItemId
   * 
   * @memberof Meals
   * 
   * @returns {void}
   */
  deleteMealItem = (mealItemId) => {
    this.props.deleteMealItem(mealItemId)
      .then(() => this.closeModal());
  }

  /**
   * 
   * @method closeModal
   * 
   * @memberof Meals
   * 
   * @returns {void}
   */
  closeModal = () => {
    this.setState({
      displayDeleteModal: false
    });
  }


  render() {
    const {
      addModalShow,
      isLoading,
      isDeleting,
      meals 
    } = this.props;
    const { displayDeleteModal, modalContent } = this.state;
    return (
      <Fragment>
        <ToastContainer />
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
        <DeleteMealModal
          displayDeleteModal={displayDeleteModal}
          modalContent={modalContent}
          closeModal={this.closeModal}
          deleteMealItem={this.deleteMealItem}
          isDeleting={isDeleting}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ mealItems }) => ({
  meals: mealItems.meals,
  isLoading: mealItems.isLoading,
  addModalShow: mealItems.addMealModal.show,
  isDeleting: mealItems.isDeleting
});

const mapDispatchToProps = {
  fetchMealItems,
  showAddMealModal,
  deleteMealItem
};

Meals.propTypes = {
  fetchMealItems: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showAddMealModal: PropTypes.func.isRequired,
  deleteMealItem: PropTypes.func,
  isDeleting: PropTypes.bool,
  meals: PropTypes.arrayOf(PropTypes.shape({})),
  addModalShow: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
