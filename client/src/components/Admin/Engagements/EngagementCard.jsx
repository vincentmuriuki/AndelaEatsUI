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
  engagement: { endDate, startDate, vendor: { name } } 
}) => (
  <div className="table-body">
    <div className="table-row">
      <div className="custom-row">
        <div className="custom-col-6 row-content">
          { name }
        </div>
        <div className="custom-col-3 start-date">{dateFormatter(startDate)}</div>
        <div className="custom-col-3">{dateFormatter(endDate)}</div>
      </div>
    </div>
  </div>
);

EngagementCard.propTypes = {
  engagement: PropTypes.shape({
    endDate: PropTypes.string,
    startDate: PropTypes.string,
    vendor: PropTypes.object
  })
};
