import React from 'react';
import {
  func, string, number, bool
} from 'prop-types';

const DeleteMenuModal = ({
  closeModal, mainMeal, id, deleteMenu, deleting
}) => (
  <div
    className="modal"
    id="delete-menu-modal"
    style={{ display: 'block' }}
  >
    <div className="modal-content">
      <div className="modal-header">
        <div className="header-title">Delete Menu</div>
      </div>
      <h3>Permanently delete {mainMeal}</h3>
      <span className="warning">This cannot be undone</span>
      <div className="modal-footer">
        <button 
          className="grayed upper" 
          type="button"
          disabled={deleting}
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="fill upper"
          id="delete-meal" 
          type="button" 
          tabIndex={0}
          disabled={deleting}
          onClick={() => deleteMenu(id)}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

DeleteMenuModal.propTypes = {
  closeModal: func.isRequired,
  mainMeal: string.isRequired,
  id: number.isRequired,
  deleteMenu: func.isRequired,
  deleting: bool.isRequired,
};

export default DeleteMenuModal;
