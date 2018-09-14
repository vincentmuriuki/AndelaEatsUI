import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  displayModal, 
  closeModal, 
  deleteOrder, 
  modalContent 
}) => (
  <div className="modal" style={(displayModal) ? { display: 'block' } : { display: 'none' }}>
    { displayModal 
      ? (
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">Delete Order</div>
          </div>
          <h3>{`Permanently delete ${modalContent.name.main} and ${modalContent.name.protein} order?`}</h3>
          <span className="warning">This cannot be undone</span>
          <div className="modal-footer">
            <div className="cta">
              <div className="float-right">
                <button
                  type="button"
                  className="btn-delete close-modal" 
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-delete delete-order" 
                  onClick={() => deleteOrder(modalContent.id)}
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


Modal.propTypes = {
  displayModal: PropTypes.bool,
  closeModal: PropTypes.func,
  deleteOrder: PropTypes.func,
  modalContent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isCollected: PropTypes.bool,
    name: PropTypes.shape({
      main: PropTypes.string,
      protein: PropTypes.string
    }),
    imageUrl: PropTypes.string,
    orderDate: PropTypes.string.isRequired,
    rating: PropTypes.number
  })
};

export default Modal;