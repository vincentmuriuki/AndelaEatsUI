import React from 'react';
import PropTypes from 'prop-types';

const OrderCard = ({ order, status, showStatus }) => (
  <div className={`table-body ${status ? 'collected' : 'not-collected'}`}>
    <div className="table-row">
      <div className="custom-row">
        <div className="custom-col-4">{order.id}</div>
        <div className={`custom-col-${showStatus ? 2 : 3}`}>{order.owner}</div>
        <div className={`custom-col-${showStatus ? 4 : 5}`}>
          { showStatus && <span>&nbsp;&nbsp;</span>}
          {order.orderDescription}
        </div>
        { showStatus && (
          <div className="custom-col-2 options-wrapper">
            <span>{`${!status ? 'Not ' : ""}Collected`}
              <span className="dropdown">
                <div className="arrow-down" />
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    orderDescription: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  status: PropTypes.bool,
  showStatus: PropTypes.bool.isRequired,
};

export default OrderCard;
