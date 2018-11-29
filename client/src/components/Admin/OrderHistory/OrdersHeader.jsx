import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from "react-csv";
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';

import { validateDate } from '../../../helpers/dateFormatter.js';
import { fetchOrders } from '../../../actions/admin/ordersAction.js';

const headers = [
  { label: "ID", key: "id" },
  { label: "Owner", key: "owner" },
  { label: "OrderDescription", key: "orderDescription" }
];


export class OrdersHeader extends Component {
  state = {
    isOpen: false,
    start: '',
    end: ''
  }


  handleSubmit = () => {
   const { start, end } = this.state;
   const { handleFilter } = this.props;
   const dates = validateDate(start, end);

   if(dates) {
      handleFilter(dates.startDate, dates.endDate)
      this.setState({
        isOpen: false,
        start: '',
        end: ''
      })
    }
  
  }

  /**
   * Toggle Filter modal
   *
   * @memberof OrdersHeader
   *
   * @returns {void}
   */
  toggleFilterModal = () => {
    this.setState(prevProps => ({
      isOpen: !prevProps.isOpen
    }))
  }

  render() {
    const {
    title,
    orders,
    redirectToExport,
    svg
  } = this.props;

  const { isOpen, start, end } = this.state;

  const type = this.props.type || 1;

    return (
      <header className="orders-header">
        <div className="left-section">
          <h2 className="orders-header-title">{title}</h2>
          { type === 1 && (
            <button
              disabled={orders.length === 0}
              className={`export-btn ${orders.length === 0 && "grayed"}`}
              onClick={redirectToExport}
              type="button"
            >
              Export
              <span className="export-icon">
                <img src={svg} alt="" />
              </span>
            </button>
          )}
        </div>
        <div>
          { type === 1 && (
            <Fragment>
              <button
                className="filter-btn"
                type="button"
                onClick={this.toggleFilterModal}
              >
                <i className="fa fa-filter" />
                Filter
              </button>
              {isOpen && <form
                  className={`dropdown ${isOpen && "active"}`}
                >
                  <div>
                    <label className="date-label" htmlFor="start">Start Date
                      <DatePicker
                        onChange={(date) => this.setState({ start: date })}
                        value={start}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="date-label" htmlFor="end">End Date
                      <DatePicker
                        onChange={(date) => this.setState({ end: date })}
                        value={end}
                      />
                    </label>
                  </div>

                  <div className="actions">
                  <button
                    className="input btn"
                    type="button"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                    <a
                      className="action-item"
                      role="button"
                      tabIndex="0"
                      onClick={this.toggleFilterModal}
                    >Close
                    </a>
                  </div>
                </form>
             }
              </Fragment>
          )}

          { type === 2 && (
          <CSVLink data={orders} headers={headers}>
            <button
              disabled={orders.length === 0}
              className={`export-btn-2 ${orders.length === 0 && "grayed"}`}
              type="button"
            >
              <span className="export-icon">
                <img src={svg} alt="" />
              </span>
                Download
            </button>
          </CSVLink>
          )}
        </div>
      </header>
    );
  }
};

OrdersHeader.propTypes = {
  type: PropTypes.number,
  orders: PropTypes.object.isRequired,
  redirectToExport: PropTypes.func,
  svg: PropTypes.any,
  title: PropTypes.string.isRequired,
  orders: PropTypes.array
};

export default connect(null, { fetchOrders })(OrdersHeader);
