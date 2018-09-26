import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import MealCard from './MealCard';
import Loader from '../../common/Loader/Loader';
import {
  fetchMealItems,
  showMealModal,
  deleteMealItem
} from '../../../actions/admin/mealItemsAction';
import MealModal from './MealModal/Index';
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
      displayMealModal: false,
      editMode: false,
      displayDeleteModal: false,
      modalContent: {}
    };
  }

  componentDidMount() {
    this.props.fetchMealItems();
  }

  /**
   * 
   * @method toggleAddModal
   * 
   * @param {boolean} mealDetails
   * @param {boolean} edit
   * 
   * @memberof Meals
   * 
   * @returns {void}
   */
  toggleAddModal = (mealDetails, edit = false) => {
    const { displayMealModal } = this.state;

    this.props.showMealModal(!displayMealModal);

    this.setState({
      editMode: edit,
      displayMealModal: !displayMealModal,
      mealDetails
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
      {...meal}
      showDeleteModal={this.showDeleteModal}
      showEditModal={this.toggleAddModal}
    />
  );


  render() {
    const {
      displayMealModal,
      isLoading,
      isDeleting,
      meals 
    } = this.props;
    const {
      displayDeleteModal, modalContent, editMode, mealDetails
    } = this.state;

    return (
      <Fragment>
        <ToastContainer />
        <MealModal
          toggleAddModal={this.toggleAddModal}
          show={displayMealModal}
          edit={editMode}
          mealDetails={mealDetails}
        />
        { isLoading && (<Loader />) }
        <div className={`${isLoading && 'blurred'}`} id="admin-meals">
          <header>
            <div>
              <span className="title pull-left">Meals</span>
              <button
                className="pull-right"
                type="button"
                onClick={() => this.toggleAddModal(null)}
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
  displayMealModal: mealItems.mealModal.show,
  isDeleting: mealItems.isDeleting
});

const mapDispatchToProps = {
  fetchMealItems,
  showMealModal,
  deleteMealItem
};

Meals.propTypes = {
  fetchMealItems: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showMealModal: PropTypes.func.isRequired,
  deleteMealItem: PropTypes.func,
  isDeleting: PropTypes.bool,
  meals: PropTypes.arrayOf(PropTypes.shape({})),
  displayMealModal: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
