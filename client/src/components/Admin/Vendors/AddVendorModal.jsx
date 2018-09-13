import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../common/Loader/Loader';
import inputValidation from '../../../helpers/inputValidation';

/**
 *
 *
 * @class Vendors
 * @extends {Component}
 */
export class AddVendorModal extends Component {
  static initialState = () => ({
    vendorName: '',
    vendorAddress: '',
    contactPerson: '',
    phoneNumber: '',
    errors: {}
  });

  constructor(props) {
    super(props);
    this.state = AddVendorModal.initialState();

    this.onChange = this.onChange.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }
  
  /**
   * Handles input fields text changes
   *
   * @param {object} event
   *
   * @memberof AddVendorModal
   * 
   * @returns {void}
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   *  Handles
   * 
   * @param {void}
   * 
   * @memberof AddVendorModal
   * 
   * @returns {void}
   */

  closeModal() {
    this.setState(AddVendorModal.initialState());
    this.props.toggleModal();
  }

  /**
   *  Handles
   * 
   * @param {void} void
   * 
   * @memberof AddVendorModal
   * 
   * @returns {void}
   */
  clearErrors() {
    this.setState({ errors: {} });
  }


  /**
   * Handles form submission
   * 
   * @param {object} event
   * 
   * @memberof AddVendorModal
   * 
   * @returns {void}
   */
  formValidation(event) {
    event.preventDefault();
    const err = inputValidation(this.state);
    if (err.isEmpty) {
      this.props.handleSubmit(this.state);
    } else {
      this.setState({ errors: err.errors });
    }
  }

  render() {
    const {
      vendorName, vendorAddress, phoneNumber, contactPerson, errors
    } = this.state;
    const { displayModal, isCreating } = this.props;
    return (
      <div 
        className="modal" 
        style={displayModal ? { display: 'block' } : { display: 'none' }}
      >
        <div className="vendors-modal-content">
          <div className="vendor-modal-header">
            <div className="header-title">ADD VENDOR</div>
            <span
              tabIndex={0}
              role="button"
              className="close-icon"
              onClick={this.closeModal}
            >
              X&nbsp;&nbsp;Close
            </span>
          </div>
          <form onSubmit={this.formValidation}>
            <div>
              <div className="form-row">
                <label className="label-text" htmlFor="vendorName">Name
                  <input
                    id="vendorName"
                    className="input"
                    name="vendorName"
                    onChange={this.onChange}
                    onFocus={this.clearErrors}
                    value={vendorName}
                  />
                </label>
                <span className="form-error">
                  {errors.vendorName ? errors.vendorName : ""}
                </span>
              </div>
              <div className="form-row">
                <label className="label-text" htmlFor="vendorAddress">Address
                  <input
                    id="vendorAddress"
                    className="input"
                    name="vendorAddress"
                    onChange={this.onChange}
                    onFocus={this.clearErrors}
                    value={vendorAddress}
                  />
                </label>
                <span className="form-error">
                  {errors.vendorAddress ? errors.vendorAddress : ""}
                </span>
              </div>
              <div className="form-row">
                <label htmlFor="phoneNumbert" className="label-text">Phone
                  <input
                    id="phoneNumber"
                    className="input"
                    name="phoneNumber"
                    onChange={this.onChange}
                    onFocus={this.clearErrors}
                    value={phoneNumber}
                  />
                </label>
                <span className="form-error">
                  {errors.phoneNumber}
                </span>
              </div>
              <div className="form-row">
                <label htmlFor="contactPerson" className="label-text">Contact Person
                  <input
                    id="contactPerson"
                    className="input"
                    name="contactPerson"
                    onChange={this.onChange}
                    onFocus={this.clearErrors}
                    value={contactPerson}
                  />
                </label>
                <span className="form-error">
                  {errors.contactPerson ? errors.contactPerson : ""}
                </span>
              </div>
              <div className="form-row">
                { isCreating ? <div className="modal-loader"><Loader /></div>
                  : (
                    <div className="button-container">
                      <button
                        type="button"
                        className="cancel-button" 
                        onClick={this.closeModal}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="add-button"
                      >
                        Add Vendor
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddVendorModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  isCreating: PropTypes.bool,
  handleSubmit: PropTypes.func,
  displayModal: PropTypes.bool.isRequired
};
 

export default AddVendorModal;
