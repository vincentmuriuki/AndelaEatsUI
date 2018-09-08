import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';

/**
 *
 *
 * @class Vendors
 * @extends {Component}
 */
export class AddVendorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      contact: '',
      startDate: '',
      endDate: '',
    };

    this.onChange = this.onChange.bind(this);
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


  render() {
    const {
      name, address, contact, startDate, endDate 
    } = this.state;
    const { displayModal, toggleModal } = this.props;
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
              onClick={toggleModal}
            >
              X&nbsp;&nbsp;Close
            </span>
          </div>
          <form>
            <div>
              <div className="form-row">
                <label className="label-text" htmlFor="name ">Name
                  <input
                    id="name"
                    className="input"
                    name="name"
                    onChange={this.onChange}
                    value={name}
                  />
                </label>
              </div>
              <div className="form-row">
                <label className="label-text" htmlFor="address">Address
                  <input
                    id="address"
                    className="input"
                    name="address"
                    onChange={this.onChange}
                    value={address}
                  />
                </label>
              </div>
              <div className="form-row">
                <label htmlFor="contact" className="label-text">Contact
                  <input
                    id="contact"
                    className="input"
                    name="contact"
                    onChange={this.onChange}
                    value={contact}
                  />
                </label>
              </div>
              <div className="form-row">
                <div className="date-container">
                  <div className="start-date">
                    <label className="label-text" htmlFor="start">
                      Start Date
                      <DayPickerInput
                        id="start"
                        name="start"
                        onDayChange={(day) => this.setState({ startDate: day })}
                      />
                    </label>
                  </div>
                  <div className="end-date">
                    <label className="label-text" htmlFor="end">End Date
                      <DayPickerInput
                        onDayChange={(day) => this.setState({ endDate: day })}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="button-container">
                  <button 
                    type="submit" 
                    className="cancel-button" 
                    onClick={toggleModal}
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
  displayModal: PropTypes.bool.isRequired
};

export default AddVendorModal;
