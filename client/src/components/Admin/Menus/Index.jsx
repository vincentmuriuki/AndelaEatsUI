import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  func, shape, arrayOf, bool, any
} from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import MenuModal from './MenuModal';
import {
  fetchMenus,
  fetchVendorEngagements,
  mockMenu,
  deleteMenuItem,
  fetchMealItems, 
  createMenu
} from '../../../actions/admin/menuItemsAction';
import { formatMenuItemDate } from '../../../helpers/menusHelper';
import EmptyContent from '../../common/EmptyContent';
import Loader from '../../common/Loader/Loader';
import DeleteMenuModal from './DeleteMenuModal';
import mockMenuList from '../../../tests/__mocks__/mockMenuList';

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
    displayDeleteModal: false,
    modalTitle: '',
    modalButtontext: '',
    menuDetails: {}
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
  componentDidMount() {
    this.props.fetchMenus()
      .then(() => this.props.mockMenu(mockMenuList));
    this.props.fetchVendorEngagements();
    this.props.fetchMealItems();
  }

  /**
   *
   *
   * @description joins strings
   *
   * @param { Array } array
   * @param { Stirng } key
   * 
   * @returns { String }
   *
   * @memberof Menus
   */
  commaJoinComplementryItems = (array) => (
    array.map(item => item).join(', ')
  );

  /**
   * 
   * @method showAddModal
   * 
   * @memberof Menus
   * 
   * @returns { void }
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
   * @method showDeleteModal
   * 
   * @memberof Menus
   * 
   * @param {object} menuDetails
   * 
   * @returns {void}
   */
  showDeleteModal = (menuDetails) => {
    this.setState({
      displayDeleteModal: true,
      menuDetails
    });
  }

  /**
   * 
   * @method deleteMenu
   *
   * @param {number} menuId
   * 
   * @memberof Menu
   * 
   * @returns {void}
   */
  deleteMenu = (menuId) => {
    this.props.deleteMenuItem(menuId)
      .then(() => this.closeModal());
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
    this.setState(Menus.initialState());
  }

  /**
   * Handles form submission
   * 
   * @param {object} menu
   * 
   * @memberof Menu
   * 
   * @returns {void}
   */
  handleSubmit = (menu) => {
    this.props.createMenu(menu)
      .then(() => {
        this.closeModal();
      });
  }

  /**
   *
   * 
   * @description render menus section
   *
   * @memberof Menus
   * 
   * @returns { JSX }
   */
  renderMenus = () => {
    const {
      error,
      menuList, 
      isDeleting, 
      vendorEngagements, 
      mealItems,
      isCreating
    } = this.props.menus;
    const {
      displayModal,
      modalTitle,
      modalButtontext,
      displayDeleteModal,
      menuDetails
    } = this.state;
    
    return (
      <div id="admin-menus">
        { error.status
          ? (
            <div className="no-content">
              Error occured while loading menus :-(
            </div>
          )
          : (
            <Fragment>
              <header>
                <div>
                  <span className="title pull-left">Menu</span>
                  <button
                    id="add-menu"
                    className="pull-right"
                    type="button"
                    onClick={this.showAddModal}
                  >
                    Add menu item
                  </button>
                </div>
              </header>
              
              <main>
                {
                  !menuList.length
                    ? <EmptyContent message="No menus has been added yet" />
                    : (
                      <div className="custom-table">
                        <div className="ct-header">
                          <div className="custom-col-5">Date</div>
                          <div className="custom-col-4">Main Meal</div>
                          <div className="custom-col-6">Protein</div>
                          <div className="custom-col-6">Side</div>
                          <div className="custom-col-5">Options</div>
                        </div>
                        
                        <div className="ct-body">
                          { this.renderRows() }
                        </div>
                      </div>
                    )
                  }
              </main>
              <ToastContainer />
              <MenuModal
                closeModal={this.closeModal}
                modalTitle={modalTitle}
                modalButtontext={modalButtontext}
                displayModal={displayModal}
                vendorEngagements={vendorEngagements}
                handleSubmit={this.handleSubmit}
                mealItems={mealItems}
                isCreating={isCreating}
              />
              {displayDeleteModal && (
              <DeleteMenuModal
                display={displayDeleteModal}
                deleteMenu={this.deleteMenu}
                closeModal={this.closeModal}
                deleting={isDeleting}
                {...menuDetails}
              />)}
            </Fragment>
          )
        }
      </div>
    );
  }

  /**
   * @description generate menu rows
   * 
   * @returns { Array }
   * 
   * @memberof Menus
   */
  renderRows = () => {
    const { menuList, dateOfMeal } = this.props.menus;

    return menuList.map(menuItem => {
      const {
        mainMealId,
        mainMeal,
        sideItems,
        proteinItems,
        allowedSide,
        allowedProtein
      } = menuItem;

      return (
        <div key={mainMealId} className="ct-row">
          <div className="ct-wrap">
            <div className="custom-col-5">
              { formatMenuItemDate(dateOfMeal) }
            </div>
            <div className="custom-col-4">{mainMeal}</div>
            
            { this.renderProteinSideItems(
              proteinItems,
              allowedProtein
            )}

            { this.renderProteinSideItems(
              sideItems,
              allowedSide
            )}

            <div className="custom-col-5">
              <Link to="#">
                <span>Edit</span>
              </Link>

              <Link to="#" onClick={() => this.showDeleteModal(menuItem)}>
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
   * @description render side and protein listing
   *
   * @param { Array } itemsAvailable
   * @param { Integer } optionsCanPick
   *
   * @memberof Menus
   * 
   * @returns { JSX }
   */
  renderProteinSideItems = (itemsAvailable, optionsCanPick) => (
    <div className="custom-col-6 clearfix">
      <span className="side-pick-count">
        { optionsCanPick }
      </span>
      { this.commaJoinComplementryItems(itemsAvailable) }
    </div>
  );
  
  render() {
    const { isLoading } = this.props.menus;
    return (
      <Fragment>
        { isLoading
          ? <Loader />
          : this.renderMenus()
        }
      </Fragment>
    );
  }
}

Menus.propTypes = {
  fetchMenus: func.isRequired,
  fetchMealItems: func.isRequired,
  createMenu: func.isRequired,
  fetchVendorEngagements: func.isRequired,
  deleteMenuItem: func.isRequired,
  mockMenu: func,
  isCreating: bool,
  menus: shape({
    isLoading: bool.isRequired,
    isDeleting: bool.isRequired,
    menuList: arrayOf(shape({})),

    dateOfMeal: any,
    error: shape({
      status: bool,
      message: any
    })
  })
};

const mapStateToProps = ({ menus }) => ({ menus });

export default connect(mapStateToProps,
  {
    fetchMenus,
    mockMenu,
    deleteMenuItem,
    fetchVendorEngagements,
    fetchMealItems,
    createMenu
  })(Menus);
