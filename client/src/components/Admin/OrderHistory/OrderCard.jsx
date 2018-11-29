import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import decodedToken from '../../../helpers/jwtDecode.js'

const OrderCard = ({ order: { userId, dateBookedFor, mealItems, orderStatus } }) => {
  return (
  <div className={
      `table-body ${orderStatus === 'collected' ?
      'collected' : orderStatus === 'booked' ?
      'not-collected' : 'cancelled'}`}
  >
    <div className="table-row">
      <div className="custom-row">
        <div className="custom-col-4">
          { userId === decodedToken().id ?
            `${decodedToken().firstName} ${decodedToken().lastName}` :
             ''
          }
        </div>
        <div className={`custom-col-${orderStatus ? 2 : 3}`}>
          { format(dateBookedFor, 'YYYY-MM-DD') }
        </div>
        <div className={`custom-col-${orderStatus ? 4 : 5}`}>
          { orderStatus && <span>&nbsp;&nbsp;</span>}
          { `${mealItems[0].name}, ${mealItems[1].name}, ${mealItems[2].name}`}
        </div>
        { orderStatus && (
          <div className="custom-col-2 options-wrapper">
            <span>{orderStatus}
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
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    dateBookedFor: PropTypes.string.isRequired,
    mealItems: PropTypes.array.isRequired
  })
};

export default OrderCard;