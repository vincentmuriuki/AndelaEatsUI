import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { menuItemsUI } from '../../../tests/__mocks__/mockMenuItems';
import MenuModal from './MenuModal';
import inputValidation from '../../../helpers/inputValidation';

/**
 * 
 * 
 * @description Menus Component
 * 
 * @class Menus
 * @extends Component
 */
class Menus extends Component {
  static initialState = () => ({
    menus: [],
    displayModal: false,
    modalTitle: '',
    modalButtontext: '',
  })

  constructor(props) {
    super(props);

    this.state = Menus.initialState();
  }

  /**
   * @description update menus
   * Can be removed in favor of loading menus from DB
   * 
   * @memberof Menus
   * 
   * @returns { undefined }
   */
  componentWillMount() {
    this.setState({
      menus: [...menuItemsUI]
    });
  }

  /**
   * @description generate menu rows
   * 
   * @returns { Array }
   * 
   * @memberof Menus
   */
  renderRows = () => {
    const { menus } = this.state;
  
    return menus.map(menu => {
      const {
        id, date, main, protein, soup, side
      } = menu;

      return (
        <div key={id} className="ct-row">
          <div className="ct-wrap">
            <div className="custom-col-5">{ date }</div>
            <div className="custom-col-4">{ main }</div>
            <div className="custom-col-4">{ protein }</div>
            <div className="custom-col-4">{ soup }</div>
            <div className="custom-col-4">{ side }</div>
            <div className="custom-col-5">
              <Link to="#">
                <span>Edit</span>
              </Link>

              <Link to="#">
                <span>Delete</span>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  /**
   * 
   * @method showAddModal
   * 
   * @memberof Menus
   * 
   * @returns {void}
   */
  showAddModal = () => {
    this.setState(prev => ({
      displayModal: !prev.displayModal,
      modalTitle: 'ADD MENU',
      modalButtontext: 'Add Menu'
    }));
  }

  /**
   * 
   * @method closeModal
   *
   * @param {object} vendor
   * 
   * @memberof Menu
   * 
   * @returns {void}
   */
  closeModal = () => {
    this.setState({
      displayModal: false,
    });
  }

  /**
   * Handles form submission
   * 
   * @param {object} menuDetails
   * 
   * @memberof Menu
   * 
   * @returns {void}
   */
  handleSubmit = () => {}

  render() {
    const {
      displayModal,
      modalTitle,
      modalButtontext,
    } = this.state;
    return (
      <div id="admin-menus">
        <header>
          <div>
            <span className="title pull-left">Menu</span>
            <button
              className="pull-right"
              type="button"
              onClick={this.showAddModal}
            >
              Add menu item
            </button>
          </div>
        </header>
        
        <main>
          <div className="custom-table">
            <div className="ct-header">
              <div className="custom-col-5">Date</div>
              <div className="custom-col-4">Main Item</div>
              <div className="custom-col-4">Protein</div>
              <div className="custom-col-4">Soup</div>
              <div className="custom-col-4">Side</div>
              <div className="custom-col-5">Options</div>
            </div>
            
            <div className="ct-body">
              { this.renderRows() }
            </div>
          </div>
        </main>
        <MenuModal
          closeModal={this.closeModal}
          modalTitle={modalTitle}
          modalButtontext={modalButtontext}
          displayModal={displayModal}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Menus;
