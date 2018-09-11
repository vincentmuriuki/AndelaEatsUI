import React from 'react';
import svg from '../../../assets/images/download-icon.svg';

/**
 * @function Orders
 * 
 * @returns {JSX}
 */
const Orders = () => (
  <section className="admin-orders">
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
    <div className="table-body not-collected">
      <div className="table-row">
        <div className="custom-row">
          <div className="custom-col-4">#000023</div>
          <div className="custom-col-2">Harrison Maina</div>
          <div className="custom-col-4">Beef Ugali, Oranges and Cake</div>
          <div className="custom-col-2 options-wrapper">
            <span>Not Collected
              <span className="dropdown">
                <div className="arrow-down" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="table-body not-collected">
      <div className="table-row">
        <div className="custom-row">
          <div className="custom-col-4">#000023</div>
          <div className="custom-col-2">Harrison Maina</div>
          <div className="custom-col-4">Rice, Beans, Orange Juice and Cake</div>
          <div className="custom-col-2 options-wrapper">
            <span>Not Collected
              <span className="dropdown">
                <div className="arrow-down" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="table-body not-collected">
      <div className="table-row">
        <div className="custom-row">
          <div className="custom-col-4">#000023</div>
          <div className="custom-col-2">Harrison Maina</div>
          <div className="custom-col-4">Beef Ugali, Oranges and Cake</div>
          <div className="custom-col-2 options-wrapper">
            <span>Not Collected
              <span className="dropdown">
                <div className="arrow-down" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="table-body collected">
      <div className="table-row">
        <div className="custom-row">
          <div className="custom-col-4">#000023</div>
          <div className="custom-col-2">Harrison Maina</div>
          <div className="custom-col-4">Beef Ugali, Oranges and Cake</div>
          <div className="custom-col-2 options-wrapper">
            <span>Collected
              <span className="dropdown">
                <div className="arrow-down" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="table-body collected">
      <div className="table-row">
        <div className="custom-row">
          <div className="custom-col-4">#000023</div>
          <div className="custom-col-2">Harrison Maina</div>
          <div className="custom-col-4">Beef Ugali, Oranges and Cake</div>
          <div className="custom-col-2 options-wrapper">
            <span>Collected
              <span className="dropdown">
                <div className="arrow-down" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="table-body collected">
      <div className="table-row">
        <div className="custom-row">
          <div className="custom-col-4">#000023</div>
          <div className="custom-col-2">Harrison Maina</div>
          <div className="custom-col-4">Beef Ugali, Oranges and Cake</div>
          <div className="custom-col-2 options-wrapper">
            <span>Collected
              <span className="dropdown">
                <div className="arrow-down" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="table-body collected">
      <div className="table-row">
        <div className="custom-row">
          <div className="custom-col-4">#000023</div>
          <div className="custom-col-2">Harrison Maina</div>
          <div className="custom-col-4">Beef Ugali, Oranges and Cake</div>
          <div className="custom-col-2 options-wrapper">
            <span>Collected
              <span className="dropdown">
                <div className="arrow-down" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="table-body collected">
      <div className="table-row">
        <div className="custom-row">
          <div className="custom-col-4">#000023</div>
          <div className="custom-col-2">Harrison Maina</div>
          <div className="custom-col-4">Beef Ugali, Oranges and Cake</div>
          <div className="custom-col-2 options-wrapper">
            <span>Collected
              <span className="dropdown">
                <div className="arrow-down" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="table-body collected">
      <div className="table-row">
        <div className="custom-row">
          <div className="custom-col-4">#000023</div>
          <div className="custom-col-2">Harrison Maina</div>
          <div className="custom-col-4">Beef Ugali, Oranges and Cake</div>
          <div className="custom-col-2 options-wrapper">
            <span>Collected
              <span className="dropdown">
                <div className="arrow-down" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Orders;
