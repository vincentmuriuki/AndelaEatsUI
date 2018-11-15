import React from 'react';
import PropTypes from 'prop-types';

const DeleteEngagementModal = ({
  closeModal,
  displayDeleteModal
}) => (
  <div 
    className="modal" 
    id="delete-vendor-modal"
    style={(displayDeleteModal) ? { display: 'block' } : { display: 'none' }}
  >
    { displayDeleteModal 
      ? (
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">Suspend Engagement</div>
          </div>
          <h3>{`Permanently delete Engagement`}</h3>
          <span className="warning">This cannot be undone</span>
          <div className="modal-footer">
            <div className="">
              <button 
                className="grayed upper" 
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="fill upper delete-vendor" 
                type="button" 
              >
                Suspend
              </button>
            </div>
          </div>
        </div>
      )
      : null
    }
  </div>
);

DeleteEngagementModal.propTypes = {
  closeModal: PropTypes.func,
  displayDeleteModal: PropTypes.bool
};

export default DeleteEngagementModal;
