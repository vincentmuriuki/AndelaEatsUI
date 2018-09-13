/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 *
 *
 * @class Vendors
 * @extends {Component}
 */
export class AddMealModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { show } = this.props;

    return (
      <div
        className="modal"
        style={show ? { display: 'block' } : { display: 'none' }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">ADD MEAL</div>
            <div>
              <button
                tabIndex={0}
                type="button"
                className="close-icon"
                onClick={this.props.toggleAddModal}
              >
                X&nbsp;&nbsp;Close
              </button>
            </div>
          </div>

          <form method="post" action="">
            <main>
              <div>
                Upload meal thumbnail. &nbsp;
                <Link to="#">Select from computer</Link>
              </div>
              <div className="image">
                <div className="control">
                  <button type="button">
                    <i className="fas fa-plus" />
                  </button>
                  
                  <span>Upload image</span>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" />
              </div>

              <div className="form-field">
                <label htmlFor="meal-type">Meal type</label>
                <select id="meal-type">
                  <option value="" />
                  <option value="main">Main</option>
                </select>
              </div>
            </main>

            <div className="modal-footer">
              <button type="button" className="grayed-button">Cancel</button>
              <button type="button">Add meal</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddMealModal.propTypes = {
  show: PropTypes.bool,
  toggleAddModal: PropTypes.func
};

export default AddMealModal;
