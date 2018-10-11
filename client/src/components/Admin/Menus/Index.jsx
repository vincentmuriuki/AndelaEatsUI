import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MenuModal from './MenuModal';
import { fetchMenus } from '../../../actions/admin/menuItemsAction';
import { formatMenuItemDate } from '../../../helpers/menusHelper';
import EmptyContent from '../../common/EmptyContent';
import Loader from '../../common/Loader/Loader';

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
    this.props.fetchMenus();
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
  commaJoinComplementryItems = (array, key) => (
    array.map(item => item[key]).join(', ')
  );

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
    const { error, menuList } = this.props.menus;
    const {
      displayModal,
      modalTitle,
      modalButtontext,
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
              <MenuModal
                closeModal={this.closeModal}
                modalTitle={modalTitle}
                modalButtontext={modalButtontext}
                displayModal={displayModal}
                handleSubmit={this.handleSubmit}
              />
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
        mealId,
        mainMealName,
        sideItemsAvailable,
        proteinItemsAvailable,
        sideOptionsCanPick,
        proteinOptionsCanPick
      } = menuItem;

      return (
        <div key={mealId} className="ct-row">
          <div className="ct-wrap">
            <div className="custom-col-5">
              { formatMenuItemDate(dateOfMeal) }
            </div>
            <div className="custom-col-4">{mainMealName}</div>
            
            { this.renderProteinSideItems(
              proteinItemsAvailable,
              proteinOptionsCanPick
            )}

            { this.renderProteinSideItems(
              sideItemsAvailable,
              sideOptionsCanPick
            )}

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
      { this.commaJoinComplementryItems(
        itemsAvailable,
        'mealDescription'
      ) }
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
  fetchMenus: PropTypes.func.isRequired,

  menus: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    menuList: PropTypes.arrayOf(PropTypes.shape({})),

    dateOfMeal: PropTypes.any,
    error: PropTypes.shape({
      status: PropTypes.bool,
      message: PropTypes.any
    })
  })
};

const mapStateToProps = ({ menus }) => ({ menus });

export default connect(mapStateToProps, { fetchMenus })(Menus);
