import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DeleteVendorModal = ({
  closeDeleteModal,
  isDeleting,
  deleteVendor,
  displayDeleteModal,
  modalContent
}) => (
  <div 
    className="modal" 
    style={(displayDeleteModal) ? { display: 'block' } : { display: 'none' }}
  >
    { displayDeleteModal 
      ? (
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">Delete Vendor</div>
          </div>
          <h3>{`Permanently delete ${modalContent.vendorName}`}</h3>
          <span className="warning">This cannot be undone</span>
          <div className="modal-footer">
            <div className="cta">
              <div className="float-right">
                <button 
                  className="btn-delete close-modal" 
                  type="button"
                  disabled={isDeleting}
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className="btn-delete delete-order" 
                  type="button" 
                  tabIndex={0}
                  disabled={isDeleting}
                  onClick={() => deleteVendor(modalContent.id)}
                >
                  delete
                </button>
              </div>
            </div>        
          </div>
        </div>
      )
      : null
    }
  </div>
);

DeleteVendorModal.propTypes = {
  closeDeleteModal: PropTypes.func,
  displayDeleteModal: PropTypes.bool,
  isDeleting: PropTypes.bool,
  deleteVendor: PropTypes.func,
  modalContent: PropTypes.shape({
    vendorName: PropTypes.string,
    vendorAddress: PropTypes.string,
    contactPerson: PropTypes.string,
    phoneNumber: PropTypes.string
  })
};

export default DeleteVendorModal;
