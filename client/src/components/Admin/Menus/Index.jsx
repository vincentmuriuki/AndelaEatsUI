import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { menuItemsUI } from '../../../tests/__mocks__/mockMenuItems';

/**
 * 
 * 
 * @description Menus Component
 * 
 * @name Menus
 */
class Menus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: []
    };
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

  render() {
    return (
      <div id="admin-menus">
        <header>
          <div>
            <span className="title pull-left">Menu</span>
            <button
              className="pull-right"
              type="button"
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
      </div>
    );
  }
}

export default Menus;
