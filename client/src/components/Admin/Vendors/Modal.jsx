import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../common/Loader/Loader';


const Modal = ({
  onChange,
  closeModal,
  vendorName, 
  vendorAddress, 
  phoneNumber, 
  contactPerson, 
  errors,
  displayModal, 
  isCreating,
  isUpdating,
  formValidation,
  clearErrors,
  modalTitle,
  modalButtontext
}) => (
  <div 
    className="modal"
    id="add-vendor-modal" 
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
            onClick={closeModal}
          >
            X&nbsp;&nbsp;Close
          </button>
        </div>
      </div>
      <form onSubmit={formValidation}>
        <div>
          <div className="form-field-set">
            <label htmlFor="vendorName">Name
              <input
                id="vendorName"
                className="input"
                name="vendorName"
                onChange={onChange}
                onFocus={clearErrors}
                value={vendorName}
              />
            </label>
            <span className="form-error">
              {errors.vendorName ? errors.vendorName : ""}
            </span>
          </div>
          <div className="form-field-set">
            <label htmlFor="vendorAddress">Address
              <input
                id="vendorAddress"
                className="input"
                name="vendorAddress"
                onChange={onChange}
                onFocus={clearErrors}
                value={vendorAddress}
              />
            </label>
            <span className="form-error">
              {errors.vendorAddress ? errors.vendorAddress : ""}
            </span>
          </div>
          <div className="form-field-set">
            <label htmlFor="phoneNumber">Phone
              <input
                id="phoneNumber"
                className="input"
                name="phoneNumber"
                onChange={onChange}
                onFocus={clearErrors}
                value={phoneNumber}
              />
            </label>
            <span className="form-error">
              {errors.phoneNumber}
            </span>
          </div>
          <div className="form-field-set">
            <label htmlFor="contactPerson">Contact Person
              <input
                id="contactPerson"
                className="input"
                name="contactPerson"
                onChange={onChange}
                onFocus={clearErrors}
                value={contactPerson}
              />
            </label>
            <span className="form-error">
              {errors.contactPerson ? errors.contactPerson : ""}
            </span>
          </div>
          <div className="modal-footer">
            { isCreating || isUpdating
              ? <div className="modal-loader"><Loader /></div>
              : (
                <div className="button-container">
                  <button
                    type="button"
                    className="grayed" 
                    onClick={closeModal}
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
);
  
Modal.propTypes = {
  displayModal: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  closeModal: PropTypes.func,
  vendorName: PropTypes.string,
  vendorAddress: PropTypes.string, 
  phoneNumber: PropTypes.string,
  contactPerson: PropTypes.string,
  modalTitle: PropTypes.string,
  modalButtontext: PropTypes.string,
  errors: PropTypes.shape({}),
  isCreating: PropTypes.bool,
  isUpdating: PropTypes.bool,
  formValidation: PropTypes.func,
  clearErrors: PropTypes.func,
};
 

export default Modal;
