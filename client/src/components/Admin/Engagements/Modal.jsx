import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../common/Loader/Loader';

const Modal = ({ 
  displayModal, modalTitle, modalButtontext, closeModal 
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
      <form>
        <div>
          <div className="form-field-set">
            <label htmlFor="vendor">Vendor
              <input
                id="vendor"
                className="input"
                name="vendor"
              />
            </label>
          </div>
          <div className="form-field-set">
            <label htmlFor="startDate">Start Date
              <input
                id="startDate"
                className="input"
                name="startDate"
              />
            </label>
          </div>
          <div className="form-field-set">
            <label htmlFor="endDate">End Date
              <input
                id="endDate"
                className="input"
                name="endDate"
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
  displayModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  modalButtontext: PropTypes.string,
  closeModal: PropTypes.func
};

export default Modal;