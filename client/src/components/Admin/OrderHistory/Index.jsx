import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination/lib';
import OrderCard from './OrderCard';
import EmptyContent from '../../common/EmptyContent';
import Loader from '../../common/Loader/Loader';
import { fetchOrders } from '../../../actions/admin/ordersAction';
import OrdersHeader from './OrdersHeader';
import svg from '../../../assets/images/download-icon.svg';

/**
 *
 * @class Orders
 * @extends {Component}
 */
export class OrderHistory extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  redirectToExport = () => {
    const { history } = this.props;
    history.push('/admin/orders/export');
  }

  /**
   * @method renderOrder
   *
   * @memberof OrderHistory
   *
   * @param {object} order
   *
   * @returns {JSX}
   */
  renderOrder = (order) => {
    const collected = order.status === "true";
    return (
      <OrderCard
        key={order.id}
        order={order}
        status={collected}
        showStatus
      />
    );
  }

  render() {
    const { orders, isLoading } = this.props;

    if (!isLoading && !orders.length) {
      return (
        <div id="admin-orders-no-content">
          <EmptyContent message="No meal orders requested yet" />
        </div>
      );
    }

    return (
      <section className="admin-orders">
        { isLoading && <Loader /> }
        <div className={`${isLoading && 'blurred'}`}>
          
          <OrdersHeader
            title="Order History"
            ordersCount={orders.length}
            redirectToExport={this.redirectToExport}
            svg={svg}
          />

          <div className="table-header">
            <div className="custom-col-4">Order Number</div>
            <div className="custom-col-2">Owner</div>
            <div className="custom-col-4">Order Description</div>
            <div className="custom-col-2">Status</div>
          </div>

          { orders.map((order) => this.renderOrder(order))}

          {
            orders.length
            && (
              <Pagination
                onChange={() => {}}
                current={1}
                pageSize={3}
                total={orders.length}
                className="pagination"
              />
            )
          }
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ mealOrders }) => ({
  orders: mealOrders.orders,
  isLoading: mealOrders.isLoading
});

OrderHistory.propTypes = {
  fetchOrders: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default connect(mapStateToProps, { fetchOrders })(OrderHistory);
