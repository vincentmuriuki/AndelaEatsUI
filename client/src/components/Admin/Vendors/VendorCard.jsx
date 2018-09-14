import React from 'react';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';
import dateFormatter from '../../../helpers/dateFormatter';


/**
 * @function VendorCard
 * 
 * @param {object} { vendor, rating }
 * 
 * @returns {JSX}
 */
export const VendorCard = ({ vendor, rating, showDeleteModal }) => (
  <div className="table-body">
    <div className="table-row">
      <div className="custom-row">
        <div className="custom-col-4 row-content">
          { vendor.vendorName }
          <span>{ vendor.vendorAddress }</span>
        </div>
        <div className="custom-col-2">{ vendor.phoneNumber }</div>
        <div className="custom-col-2">{dateFormatter(vendor.createdAt)}</div>
        <div className="custom-col-2">{dateFormatter(vendor.updatedAt)}</div>
        <div className="custom-col-3">
          <ReactStars
            value={rating}
            color2="green"
            name="ratings"
            size={12}
            edit={false}
          />
        </div>
        <div className="custom-col-3 options-wrapper">
          <span>
            Edit
          </span>
          <span 
            onClick={() => showDeleteModal(vendor)}
            role="button"
            tabIndex={0}
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
    vendorName: PropTypes.string,
    phoneNumber: PropTypes.string,
    id: PropTypes.string,
    contactPerson: PropTypes.string,
    vendorAddress: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  rating: PropTypes.number,
  showDeleteModal: PropTypes.func
};
