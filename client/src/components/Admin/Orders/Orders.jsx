import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderCard from './OrderCard';
import Loader from '../../common/Loader/Loader';
import { fetchOrders } from '../../../actions/admin/ordersAction';
import svg from '../../../assets/images/download-icon.svg';

/**
 *
 * @class Orders
 * @extends {Component}
 */
export class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  /**
   * @method renderOrder
   *
   * @memberof Orders
   *
   * @param {object} order
   *
   * @returns {JSX}
   */
  renderOrder = (order) => {
    const collected = order.status === "true";
    return (<OrderCard key={order.id} order={order} status={collected} />);
  }

  render() {
    const { orders, isLoading } = this.props;

    if (isLoading) {
      return (<Loader />);
    }

    return (
      <section className="admin-orders">
        { !isLoading && orders.length
          ? (
            <div>
              <header className="orders-header">
                <div className="left-section">
                  <h2 className="orders-header-title">Orders</h2>
                  <button className="export-btn" type="button">Export
                    <span className="export-icon">
                      <img src={svg} alt="" />
                    </span>
                  </button>
                </div>
                <div>
                  <button className="filter-btn" type="button">
                    <i className="fa fa-filter" />
                    Filter
                  </button>
                </div>
              </header>
          
              <div className="table-header">
                <div className="custom-col-4">Order Number</div>
                <div className="custom-col-2">Owner</div>
                <div className="custom-col-4">Order Description</div>
                <div className="custom-col-2">Status</div>
              </div>

              { orders.map((order) => this.renderOrder(order))}

            </div>
          ) : null }
        {
          !isLoading && !orders.length && (
            <div className="no-content">
              No meal orders requested yet :-(
            </div>
          )
        }
      </section>
    );
  }
}

const mapStateToProps = ({ mealOrders }) => ({
  orders: mealOrders.orders,
  isLoading: mealOrders.isLoading
});

Orders.propTypes = {
  fetchOrders: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { fetchOrders })(Orders);
