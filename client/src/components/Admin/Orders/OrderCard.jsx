import React from 'react';
import PropTypes from 'prop-types';

const OrderCard = ({ order, status }) => (
  <div className={`table-body ${status ? 'collected' : 'not-collected'}`}>
    <div className="table-row">
      <div className="custom-row">
        <div className="custom-col-4">{order.id}</div>
        <div className="custom-col-2">{order.owner}</div>
        <div className="custom-col-4">{order.orderDescription}</div>
        <div className="custom-col-2 options-wrapper">
          <span>{`${!status ? 'Not ' : ""}Collected`}
            <span className="dropdown">
              <div className="arrow-down" />
            </span>
          </span>
        </div>
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
  status: PropTypes.bool.isRequired,
};

export default OrderCard;
