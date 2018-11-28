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
  state = {
    currentPage: 1,
  }

  componentDidMount() {
    const { currentPage } = this.state;
    this.props.fetchOrders(currentPage);
  }

  redirectToExport = () => {
    const { history } = this.props;
    history.push('/admin/orders/export');
  }

  onChange = (current) => {
    this.props.fetchOrders(current)
    this.setState({
      currentPage: current
    })
   }
   
   handleFilter = (start, end) => {
    const { currentPage } = this.state;
    this.props.fetchOrders(currentPage, start, end)
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
  renderOrder = (orders = []) => {
    return orders.map((order, key) => (
      <OrderCard
        key={key}
        order={order}
      />
    ));
  }

  render() {
    const {
      orderHistory: { orders },
      isLoading,
    } = this.props;

    const { currentPage } = this.state;

    if (orders && orders.length === 0) {
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

          { orders && (<OrdersHeader
            title="Order History"
            orders={orders}
            redirectToExport={this.redirectToExport}
            svg={svg}
            handleFilter={this.handleFilter}
          />
        )}

          <div className="table-header">
            <div className="custom-col-4">Name</div>
            <div className="custom-col-2">Date</div>
            <div className="custom-col-4">Order Description</div>
            <div className="custom-col-2">Status</div>
          </div>

          { orders && this.renderOrder(orders)}

          {
            orders && orders.length > 15 && (
              <Pagination
                onChange={this.onChange}
                current={currentPage}
                pageSize={15}
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
  orderHistory: mealOrders.orders,
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