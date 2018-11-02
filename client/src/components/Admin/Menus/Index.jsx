import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  func, shape, arrayOf, bool, any
} from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import DatePicker from 'react-datepicker';
import moment from 'moment';


import MenuModal from './MenuModal/Index';
import {
  fetchMenus,
  fetchVendorEngagements,
  mockMenu,
  deleteMenuItem,
  fetchMealItems, 
  createMenu,
  updateMenu
} from '../../../actions/admin/menuItemsAction';
import { formatMenuItemDate } from '../../../helpers/menusHelper';
import formatMealItems, { 
  formatDate,
  formatSingleSelection,
  formatMutipleSelection,
  formatMealitem,
  formatEngagement
} from '../../../helpers/formatMealItems';

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
export class Menus extends Component {
  static initialState = () => ({
    menus: [],
    displayModal: false,
    displayDeleteModal: false,
    modalTitle: '',
    modalButtontext: '',
    menuDetails: {},
    startDate: moment(),
    endDate: moment(),
    forEdit: {}
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
    this.props.fetchMenus(formatDate(moment()), formatDate(moment()));
    this.props.fetchVendorEngagements();
    this.props.fetchMealItems();
  }

  /**
   * @description fetch menu given date range
   * 
   * @memberof Menus
   * 
   * @returns { undefined }
   */
  handelViewMenu = () => {
    const { startDate, endDate } = this.state;
    this.props.fetchMenus(formatDate(startDate), formatDate(endDate));
  }

  /**
   * @description handles date range change
   * 
   * @memberof Menus
   * 
   * @param { Object } selectOption
   * @param { Object } name
   * @returns { undefined }
   */
  onChange = (selectOption, name) => {
    this.setState({
      [name]: selectOption
    });
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
    array.map(item => item.label).join(', ')
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
   * @method showEditModal
   * 
   * @memberof Menus
   * 
   * @param { Object } menuItem
   * 
   * @returns { void }
   */
  showEditModal = (menuItem) => {
    const { vendorEngagements } = this.props.menus;
    const {
      id,
      vendorEngagementId,
      date,
      mainMeal,
      allowedSide,
      allowedProtein,
      proteinItems,
      sideItems
    } = menuItem;
    this.setState(prev => ({
      modalTitle: 'EDIT MENU',
      modalButtontext: 'Update Menu',
      displayModal: !prev.displayModal,
      forEdit: {
        id,
        vendorEngagementId: formatEngagement(vendorEngagements, vendorEngagementId)[0],
        mainItem: formatMealitem(mainMeal),
        allowedSide: formatSingleSelection(allowedSide),
        allowedProtein: formatSingleSelection(allowedProtein),
        protein: formatMutipleSelection(proteinItems),
        sideMeal: formatMutipleSelection(sideItems),
      },
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
   * @param { Integer } id
   * @param { Object } menu
   * 
   * @memberof Menu
   * 
   * @returns {void}
   */
  handleSubmit = (id, menu) => {
    if (id === '') {
      this.props.createMenu(menu)
        .then(() => {
          this.closeModal();
        });
    } else {
      this.props.updateMenu(id, menu)
        .then(() => {
          this.closeModal();
        });
    }
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
      isCreating,
      isUpdating
    } = this.props.menus;
    const {
      displayModal,
      modalTitle,
      modalButtontext,
      displayDeleteModal,
      menuDetails,
      startDate,
      endDate,
      forEdit
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
                <div className="menu-header-content">
                  <div className="title-date-range">
                    <span className="title">Menu:</span>
                    <span className="date-range">from</span>
                    <div className="date-input">
                      <DatePicker
                        selected={startDate}
                        onChange={(e) => this.onChange(e, 'startDate')}
                      />
                      <span className="date-range">to</span>
                      <DatePicker
                        selected={endDate}
                        onChange={(e) => this.onChange(e, 'endDate')}
                      />
                    </div>
                    <button
                      id="view-menu"
                      className="button"
                      type="button"
                      onClick={this.handelViewMenu}
                    >
                      View Menu
                    </button>
                  </div>
                  <button
                    id="add-menu"
                    className="button"
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
                    ? <EmptyContent message="No menus within the seleted date range" />
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
                forEdit={forEdit}
                isCreating={isCreating}
                isUpdating={isUpdating}
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
        id,
        date,
        mainMeal,
        mealPeriod,
        sideItems,
        proteinItems,
        allowedSide,
        allowedProtein
      } = menuItem;

      return (
        <div key={id} className="ct-row">
          <div className="ct-wrap">
            <div className="custom-col-5">
              { moment(date).format("YYYY-MM-DD")}
            </div>
            <div className="custom-col-4">{mainMeal.name}</div>
            
            { this.renderProteinSideItems(
              proteinItems,
              allowedProtein
            )}

            { this.renderProteinSideItems(
              sideItems,
              allowedSide
            )}

            <div className="custom-col-5">
              <Link to="#" onClick={() => this.showEditModal(menuItem)}>
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
      { this.commaJoinComplementryItems(itemsAvailable.map(item => ({
        value: item.id, label: item.name 
      }))) }
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
  updateMenu: func.isRequired,
  fetchVendorEngagements: func.isRequired,
  deleteMenuItem: func.isRequired,
  mockMenu: func,
  isCreating: bool,
  isUpdating: bool,
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
    createMenu,
    updateMenu
  })(Menus);
