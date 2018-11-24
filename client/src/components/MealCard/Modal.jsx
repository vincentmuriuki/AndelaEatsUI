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
          <h3>{`Permanently delete ${modalContent.mealItems[0].name}, ${modalContent.mealItems[1].name} and ${modalContent.mealItems[2].name} order?`}</h3>
          <span className="warning">This cannot be undone</span>
          <div className="modal-footer">
            <div className="cta">
              <div className="float-right">
                <button
                  type="button"
                  className="grayed upper"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="fill upper delete-order"
                  onClick={() => deleteOrder(modalContent.id)}
                >
                  Delete
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
    id: PropTypes.number,
    mealItems: PropTypes.array
  })
};

export default Modal;