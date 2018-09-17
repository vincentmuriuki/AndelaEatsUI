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
        id="add-vendor-modal" 
        style={displayModal ? { display: 'block' } : { display: 'none' }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">ADD VENDOR</div>
            <div>
              <button
                type="button"
                tabIndex={0}
                className="close-icon btn-no-style"
                onClick={this.closeModal}
              >
                X&nbsp;&nbsp;Close
              </button>
            </div>
          </div>
          <form onSubmit={this.formValidation}>
            <div>

              <div className="form-field-set">
                <label htmlFor="vendorName">Name
                  <input
                    id="vendorName"
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

              <div className="form-field-set">
                <label htmlFor="vendorAddress">Address
                  <input
                    id="vendorAddress"
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
              <div className="form-field-set">
                <label htmlFor="phoneNumbert">Phone
                  <input
                    id="phoneNumber"
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
              <div className="form-field-set">
                <label htmlFor="contactPerson">Contact Person
                  <input
                    id="contactPerson"
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

              <div className="modal-footer">
                { isCreating ? <div className="modal-loader"><Loader /></div>
                  : (
                    <div>
                      <button
                        type="button"
                        className="grayed" 
                        onClick={this.closeModal}
                      >
                        Cancel
                      </button>
                      <button type="submit">Add Vendor</button>
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
