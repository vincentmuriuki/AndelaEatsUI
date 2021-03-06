import React from 'react';
import PropTypes from 'prop-types';
import dateFormatter from '../../../helpers/dateFormatter';


/**
 * @function EngagementCard
 * 
 * @param {object} { engagement }
 * 
 * @returns {JSX}
 */
export const EngagementCard = ({ 
  engagement: { endDate, startDate, vendor: { name } },
  showDeleteModal, 
  engagement,
  showEditModal 
}) => (
  <div className="table-body">
    <div className="table-row">
      <div className="custom-row">
        <div className="custom-col-4 row-content">
          { name }
        </div>
        <div className="custom-col-3 start-date">{dateFormatter(startDate)}</div>
        <div className="custom-col-3">{dateFormatter(endDate)}</div>
        <div className="custom-col-2">
          <span
            onClick={() => showEditModal(engagement)}
            className="edit-color edit-spacing"
          >
            Edit
          </span>
          <span
            onClick={() => showDeleteModal(engagement)}
            className="delete-color"
          >
            Delete
          </span>
        </div>
      </div>
    </div>
  </div>
);

EngagementCard.propTypes = {
  engagement: PropTypes.shape({
    endDate: PropTypes.string,
    startDate: PropTypes.string,
    vendor: PropTypes.object
  }),
  showDeleteModal: PropTypes.func,
  showEditModal: PropTypes.func
};
