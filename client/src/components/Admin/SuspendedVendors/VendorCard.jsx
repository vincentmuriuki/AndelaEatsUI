import React from 'react';
import PropTypes from 'prop-types';


/**
 * @function VendorCard
 * 
 * @param {object} { props }
 * 
 * @returns {JSX}
 */
export const VendorCard = ({ 
  vendor: {
    name, address, tel, contactPerson 
  } 
}) => (
  <div className="table-body">
    <div className="table-row">
      <div className="custom-row">
        <div className="custom-col-4 row-content">
          { name }
        </div>
        <div className="custom-col-4">{ address }</div>
        <div className="custom-col-2">{ tel }</div>
        <div className="custom-col-3">{ contactPerson }</div>
        <div className="custom-col-3">
          <span
            className="option-color edit-spacing"
          >
            Reinstate
          </span>
          <span
            className="option-color"
          >
            Delete
          </span>
        </div>
      </div>
    </div>
  </div>
);

VendorCard.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    tel: PropTypes.string,
    contactPerson: PropTypes.string
  })
};
