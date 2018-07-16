import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination/lib';
import { connect } from 'react-redux';

import MealCard from '../MealCard/MealCard';

import 'rc-pagination/assets/index.css';
import { fetchOrders } from '../../actions/ordersAction';
import Loader from '../common/Loader/Loader';

/**
 * Application's order history page
 */
export class Orders extends Component {
  /**
   * Creates an instance of OrderHistory page
   * @param {any} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      searchParam: '',
      start: '',
      end: ''
    };

    this.onChange = this.onChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   * Loads data when component mounts
   *
   * @memberof OrderHistory
   * 
   * @returns {*} null
   */
  componentDidMount() {
    this.props.fetchOrders(); //eslint-disable-line
  }

  /**
   * Handles input fields text changes
   *
   * @param {*} { target }
   * @memberof Orders
   * 
   * @returns {void}
   */
  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  /**
   * Reset the form fields
   *
   * @memberof Orders
   * 
   * @returns {void}
   */
  clearForm() {
    this.setState({
      searchParam: '',
      start: '',
      end: ''
    });
  }

  /**
   * Handles new page request in pagination
   *
   * @memberof Orders
   * @param {number} newPage
   * 
   * @returns {void}
   */
  handlePageChange(newPage) {
    this.props.fetchOrders(newPage); //eslint-disable-line
  }

  /**
   * 
   * This is React render method that render the UI on the dom
   * @function Orders
   * @return { void }
   */
  render() {
    const { match: { url }, orders } = this.props;
    const {
      isOpen, searchParam, start, end
    } = this.state;

    return (
      <Fragment>
        {orders.isLoading && <Loader />}
        <div className={`order-history ${orders.isLoading && 'blurred'}`}>
          <div className="title">
            <span>Order History</span>
            <div className="filter">
              <button
                className={`${isOpen && "active"}`}
                type="button"
                onClick={() => this.setState({ isOpen: true })}
              ><i className="fas fa-filter" />   Filter
              </button>
              <form className={`dropdown ${isOpen && "active"}`}>
                <div>
                  <input
                    type="text"
                    name="searchParam"
                    placeholder="Search order"
                    onChange={this.onChange}
                    value={searchParam}
                  />
                </div>
                <div>
                  <label htmlFor="start">Start Date<br />
                    <input
                      type="text"
                      name="start"
                      placeholder="Start date"
                      onChange={this.onChange}
                      value={start}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="end">End Date<br />
                    <input
                      type="text"
                      name="end"
                      placeholder="End date"
                      onChange={this.onChange}
                      value={end}
                    />
                  </label>
                </div>
                <div className="actions">
                  <a
                    className="action-item"
                    role="button"
                    tabIndex="0"
                    onClick={() => this.clearForm()}
                  >Clear filters
                  </a>
                  <a
                    className="action-item"
                    role="button"
                    tabIndex="0"
                    onClick={() => this.setState({ isOpen: false })}
                  >Close
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className="container">
            {
              orders.meals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  url={url}
                />
              ))
            }

            {orders.meals.length > 0 && (
              <Pagination
                locale={{ items_per_page: 'Items' }}
                onChange={this.handlePageChange}
                current={+orders.currentPage}
                pageSize={9}
                total={+orders.totalRecords}
                className="pagination"
                showTotal={(total, range) => `Showing 
              ${range[0]} - ${range[1]} of ${total} items`
                }
              />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

Orders.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }),
  orders: PropTypes.shape({
    totalRecords: PropTypes.number,
    meals: PropTypes.array
  })
};

Orders.defaultProps = {
  orders: {
    meals: [],
    totalRecords: 0
  },
  match: {
    url: '/'
  }
};

const mapStateToProps = state => ({
  orders: state.orders
});

const actionCreators = {
  fetchOrders
};

export default connect(mapStateToProps, actionCreators)(Orders);
