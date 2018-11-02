/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, Fragment } from 'react';
import { 
  func, shape, string, array, bool, date 
} from 'prop-types';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Loader from '../../../common/Loader/Loader';
import inputValidation from '../../../../helpers/inputValidation';
import formatDropdown from '../../../../helpers/formatDropdown';
import formatMealItems, {
  getIds, formatSingleSelection, formatMutipleSelection, formatDate
} from '../../../../helpers/formatMealItems';
import { adminAllowed } from '../../../../tests/__mocks__/mockMenuItems';
import MenuForm from './MenuForm';

/**
 * 
 * @class MenuMadal
 * @extends Component
 */
class MenuModal extends Component {
  static initialState = () => ({
    id: '',
    protein: [],
    sideMeal: [],
    mainItem: [],
    allowedSide: [],
    allowedProtein: [],
    vendorEngagementId: [],
    errors: {},
    collectionDate: moment()
  })

  constructor(props) {
    super(props);

    this.state = MenuModal.initialState();
  }

  componentDidUpdate(prevProps) {
    if (this.props.modalTitle === 'EDIT MENU' 
      && this.props.modalTitle !== prevProps.modalTitle) {
      const { forEdit } = this.props;
      this.setState({ ...forEdit });
    }
  }

  /**
   * 
   * @method onChange
   * 
   * @memberof MenuModal
   * 
   * @param {object} selectOption
   * @param {object} name
   * 
   * @returns {void}
   */
  onChange = (selectOption, name) => {
    const { errors } = this.state;
    if (Object.entries(errors).length > 0) {
      this.setState({ errors: {} });
    }

    this.setState({
      [name]: selectOption
    });
  }

  /**
   * 
   * @method checkAllowedSelection
   * 
   * @memberof MenuModal
   * 
   * @returns {void}
   */
  checkAllowedSelection = () => {
    const check = {};
    const {
      id,
      sideMeal,
      allowedSide,
      protein,
      allowedProtein,
      mainItem,
      collectionDate,
      vendorEngagementId 
    } = this.state;
    if (sideMeal.length > allowedSide.value 
        || sideMeal.length !== allowedSide.value) {
      check.sideMeal = '*select exact allowed side meal';
    }

    if (protein.length > allowedProtein.value
        || protein.length !== allowedProtein.value) {
      check.protein = '*select exact allowed protein';
    }

    if (Object.keys(check).length !== 0) {
      this.setState({ errors: check });
    } else {
      this.props.handleSubmit(id, {
        date: formatDate(collectionDate), 
        mealPeriod: "Lunch",
        mainMealId: mainItem.value,
        allowedSide: allowedSide.value, 
        allowedProtein: allowedProtein.value,
        sideItems: getIds(sideMeal),
        proteinItems: getIds(protein),
        vendorEngagementId: vendorEngagementId.value
      });
    }
  }

  /**
   * 
   * @method formValidation
   * 
   * @memberof MenuModal
   * 
   * @param {object} event
   * 
   * @returns {void}
   */
  formValidation = (event) => {
    event.preventDefault();
    const err = inputValidation(this.state);
    if (err.isEmpty) {
      this.checkAllowedSelection();
    } else {
      this.setState({ errors: err.errors });
    }
  }

  
  /**
   * 
   * @method handleCloseModal
   * 
   * @memberof MenuModal
   * 
   * @param { Object } event
   * 
   * @returns { Void }
   */
  handleCloseModal = () => {
    this.setState(MenuModal.initialState(), this.props.closeModal());
  }

  render() {
    const {
      modalTitle,
      modalButtontext,
      displayModal,
      vendorEngagements,
      mealItems,
      isCreating,
      isUpdating,
    } = this.props;
    const {
      sideMeal,
      mainItem,
      protein,
      vendorEngagementId,
      allowedSide,
      allowedProtein,
      collectionDate,
      errors
    } = this.state;

    const engagements = formatDropdown(vendorEngagements);
    const formatedMealItems = formatMealItems(mealItems);
  
    return (
      <Fragment>
        <div 
          className="modal"
          id="menu-modal" 
          style={displayModal ? { display: 'block' } : { display: 'none' }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <div className="header-title">{modalTitle}</div>
              <div>
                <button
                  type="button"
                  tabIndex={0}
                  className="close-icon btn-no-style"
                  onClick={this.handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
            <MenuForm
              modalTitle={modalTitle}
              modalButtontext={modalButtontext}
              displayModal={displayModal}
              vendorEngagements={vendorEngagements}
              mealItems={mealItems}
              isCreating={isCreating}
              isUpdating={isUpdating}
              sideMeal={sideMeal}
              mainItem={mainItem}
              protein={protein}
              vendorEngagementId={vendorEngagementId}
              allowedSide={allowedSide}
              allowedProtein={allowedProtein}
              collectionDate={collectionDate}
              formatedMealItems={formatedMealItems}
              engagements={engagements}
              errors={errors}
              handleCloseModal={this.handleCloseModal}
              formValidation={this.formValidation}
              onChange={this.onChange}
            />
          </div>
        </div>
      </Fragment>
    );
  } 
}

MenuModal.propTypes = {
  closeModal: func,
  modalTitle: string,
  modalButtontext: string,
  displayModal: bool,
  isCreating: bool,
  isUpdating: bool,
  handleSubmit: func,
  vendorEngagements: array,
  mealItems: array,
  forEdit: shape({})
};

export default MenuModal;
