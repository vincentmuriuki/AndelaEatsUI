import React, { Fragment } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { 
  func, shape, string, array, bool, date, object, oneOfType
} from 'prop-types';

import { adminAllowed } from '../../../../tests/__mocks__/mockMenuItems';
import Loader from '../../../common/Loader/Loader';


const MenuForm = ({
  modalTitle,
  modalButtontext,
  displayModal,
  vendorEngagements,
  mealItems,
  isCreating,
  isUpdating,
  sideMeal,
  mainItem,
  protein,
  vendorEngagementId,
  allowedSide,
  allowedProtein,
  collectionDate,
  formatedMealItems,
  engagements,
  errors,
  handleCloseModal,
  formValidation,
  onChange
}) => (
  <form onSubmit={formValidation}>
    <div>
      <div className="form-field-single">
        <label htmlFor="soup">Vendor Engagements&nbsp;
          <span>
            {errors.vendorEngagementId ? errors.vendorEngagementId : ""}
          </span>
        </label>
        <Select 
          onChange={(e) => onChange(e, 'vendorEngagementId')}
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
            onChange={(e) => onChange(e, 'mainItem')}
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
            onChange={(e) => onChange(e, 'collectionDate')}
          />
        </div>
      </div>
      <div className="form-field-double">
        <div className="select-width">
          <label htmlFor="Protien">Allowed side meal&nbsp;
            <span>
              {errors.allowedSide ? errors.allowedSide : ""}
            </span>
          </label>
          <Select 
            onChange={(e) => onChange(e, "allowedSide")}
            name="allowedSide"
            value={allowedSide}
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
            onChange={(e) => onChange(e, "allowedProtein")}
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
          onChange={(e) => onChange(e, 'sideMeal')}
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
          onChange={(e) => onChange(e, 'protein')}
          isMulti
          name="protein" 
          value={protein}
          options={formatedMealItems.protein}
          placeholder="select protein"
        />
      </div>
      <div className="modal-footer">
        { isCreating || isUpdating
          ? <div className="modal-loader"><Loader /></div>
          : (
            <div className="button-container">
              <button
                type="button"
                className="grayed" 
                onClick={handleCloseModal}
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
);

MenuForm.propTypes = {
  modalTitle: string,
  modalButtontext: string,
  displayModal: bool,
  isCreating: bool,
  isUpdating: bool,
  vendorEngagements: array,
  mealItems: array,
  sideMeal: array,
  mainItem: oneOfType([
    array,
    object
  ]),
  protein: array,
  vendorEngagementId: oneOfType([
    array,
    object
  ]),
  allowedSide: oneOfType([
    array,
    object
  ]),
  allowedProtein: oneOfType([
    array,
    object
  ]),
  collectionDate: oneOfType([
    array,
    object
  ]),
  formatedMealItems: oneOfType([
    array,
    object
  ]),
  engagements: oneOfType([
    array,
    object
  ]),
  errors: shape({}),
  handleCloseModal: func,
  formValidation: func,
  onChange: func
};


export default MenuForm;