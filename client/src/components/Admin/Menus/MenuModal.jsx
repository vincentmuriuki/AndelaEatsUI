/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, Fragment } from 'react';
import { 
  func, shape, string, array, bool, date 
} from 'prop-types';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Loader from '../../common/Loader/Loader';
import inputValidation from '../../../helpers/inputValidation';
import formatDropdown from '../../../helpers/formatDropdown';
import formatMealItems, { getIds, formatDate } from '../../../helpers/formatMealItems';
import { adminAllowed } from '../../../tests/__mocks__/mockMenuItems';

/**
 * 
 * @class MenuMadal
 * @extends Component
 */
class MenuModal extends Component {
  static initialState = () => ({
    protein: [],
    sideMeal: [],
    mainItem: [],
    allowedSideMeal: [],
    allowedProtein: [],
    vendorEngagementId: [],
    errors: {},
    collectionDate: moment()
  })

  constructor(props) {
    super(props);

    this.state = MenuModal.initialState();
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
      sideMeal,
      allowedSideMeal,
      protein,
      allowedProtein,
      mainItem,
      collectionDate,
      vendorEngagementId 
    } = this.state;

    if (Object.keys(check).length !== 0) {
      this.setState({ errors: check });
    } else {
      this.props.handleSubmit({
        date: formatDate(collectionDate), 
        mealPeriod: "Lunch",
        mainMealId: mainItem.value,
        allowedSide: allowedSideMeal.value, 
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
    this.setState(MenuModal.initialState());
    this.props.closeModal();
  }

  render() {
    const {
      modalTitle,
      modalButtontext,
      displayModal,
      vendorEngagements,
      mealItems,
      isCreating
    } = this.props;
    const {
      sideMeal,
      mainItem,
      protein,
      vendorEngagementId,
      allowedSideMeal,
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
            <form onSubmit={this.formValidation}>
              <div>
                <div className="form-field-single">
                  <label htmlFor="soup">Vendor Engagements&nbsp;
                    <span>
                      {errors.vendorEngagementId ? errors.vendorEngagementId : ""}
                    </span>
                  </label>
                  <Select 
                    onChange={(e) => this.onChange(e, 'vendorEngagementId')}
                    isSearchable
                    value={vendorEngagementId}
                    options={engagements}
                    placeholder="select vendor"
                  />
                </div>
                <div className="form-field-double">
                  <div className="select-width">
                    <label htmlFor="menuItem">Main Item&nbsp;
                      <span>
                        {errors.mainItem ? errors.mainItem : ""}
                      </span>    
                    </label>
                    <Select 
                      onChange={(e) => this.onChange(e, 'mainItem')}
                      name="mainItem" 
                      id="mainItem" 
                      value={mainItem}
                      options={formatedMealItems.main}
                      isClearable
                      placeholder="select main meal"
                    />
                  </div>
                  <div className="select-width date-input">
                    <label htmlFor="date">Collection Date&nbsp;
                      <span>
                        {errors.date ? errors.date : ""}
                      </span>    
                    </label>
                    <DatePicker
                      selected={collectionDate}
                      minDate={moment()}
                      onChange={(e) => this.onChange(e, 'collectionDate')}
                    />
                  </div>
                </div>
                <div className="form-field-double">
                  <div className="select-width">
                    <label htmlFor="Protien">Allowed side meal&nbsp;
                      <span>
                        {errors.allowedSideMeal ? errors.allowedSideMeal : ""}
                      </span>
                    </label>
                    <Select 
                      onChange={(e) => this.onChange(e, "allowedSideMeal")}
                      name="allowedSideMeal" 
                      value={allowedSideMeal}
                      options={adminAllowed}
                      isClearable
                      placeholder="select"
                    />
                  </div>
                  <div className="select-width">
                    <label htmlFor="side">Allowed protein&nbsp;
                      <span>
                        {errors.allowedProtein ? errors.allowedProtein : ""}
                      </span>
                    </label>
                    <Select 
                      onChange={(e) => this.onChange(e, "allowedProtein")}
                      name="allowedProtein" 
                      value={allowedProtein}
                      options={adminAllowed}
                      isClearable
                      placeholder="select"
                    />
                  </div>
                </div>
                <div className="form-field-single">
                  <label htmlFor="soup">Side meal&nbsp;
                    <span>
                      {errors.sideMeal ? errors.sideMeal : ""}
                    </span>
                  </label>
                  <Select 
                    onChange={(e) => this.onChange(e, 'sideMeal')}
                    isMulti
                    value={sideMeal}
                    options={formatedMealItems.side}
                    placeholder="select side meal"
                  />
                </div>
                <div className="form-field-single">
                  <label htmlFor="Protien">Protein&nbsp;
                    <span>
                      {errors.protein ? errors.protein : ""}
                    </span>
                  </label>
                  <Select 
                    onChange={(e) => this.onChange(e, 'protein')}
                    isMulti
                    name="protein" 
                    value={protein}
                    options={formatedMealItems.protein}
                    placeholder="select protein"
                  />
                </div>
                <div className="modal-footer">
                  { isCreating
                    ? <div className="modal-loader"><Loader /></div>
                    : (
                      <div className="button-container">
                        <button
                          type="button"
                          className="grayed" 
                          onClick={this.handleCloseModal}
                        >
                        Cancel
                        </button>
                        <button 
                          type="submit"
                        >
                          {modalButtontext}
                        </button>
                      </div>
                    )}
                </div>
              </div>
            </form>
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
  handleSubmit: func,
  vendorEngagements: array,
  mealItems: array
};

export default MenuModal;
