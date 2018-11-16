import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import DatePicker from 'react-datepicker';


const Modal = ({
  startDate,
  endDate, 
  onChange,
  handleSubmit,
  selectedOption,
  vendorsResult,
  displayModal, 
  modalTitle, 
  modalButtontext, 
  closeModal 
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
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-field-set">
            <label htmlFor="vendorId">Vendor
              <Select 
                value={selectedOption}
                onChange={(data) => onChange(data, "selectedOption")}
                options={vendorsResult}
              />
            </label>
          </div>
          <div className="form-field-set">
            <label htmlFor="startDate">Start Date
              <DatePicker
                selected={startDate}
                onChange={(data) => onChange(data, "startDate")}
              />
            </label>
          </div>
          <div className="form-field-set">
            <label htmlFor="endDate">End Date
              <DatePicker 
                selected={endDate}
                onChange={(data) => onChange(data, "endDate")}
              />
            </label>
          </div>
          <div className="modal-footer">
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
          </div>
        </div>
      </form>
    </div>
  </div>
);

Modal.propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  onChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  vendorsResult: PropTypes.array,
  displayModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  modalButtontext: PropTypes.string,
  closeModal: PropTypes.func
};

export default Modal;