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
export class ExportOrders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  /**
   * @method renderOrder
   *
   * @memberof ExportOrders
   *
   * @param {object} order
   *
   * @returns {JSX}
   */
  renderOrder = (order) => (
    <OrderCard showStatus={false} key={order.id} order={order} />
  );

  render() {
    const { orders, isLoading } = this.props;

    if (!isLoading && !orders.length) {
      return (
        <div id="admin-orders-no-content">
          <EmptyContent
            message="No meal has been ordered in the last 24 hours"
          />
        </div>
      );
    }

    return (
      <section className="admin-orders">
        { isLoading && <Loader /> }
        <div className={`${isLoading && 'blurred'}`}>
          
          <OrdersHeader
            title="Last 24 hours orders"
            type={2}
            ordersCount={orders.length}
            redirectToExport={this.redirectToExport}
            orders={orders}
            svg={svg}
          />

          <div className="table-header">
            <div className="custom-col-4">Order Number</div>
            <div className="custom-col-3">Owner</div>
            <div className="custom-col-5">Order Description</div>
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

ExportOrders.propTypes = {
  fetchOrders: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { fetchOrders })(ExportOrders);
