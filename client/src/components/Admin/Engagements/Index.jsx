import React from "react";


/**
 * @function Engagements
 * 
 * 
 * @returns {JSX}
 */
const Engagements = () => (
  <div className="table-wrapper">
    <div className="vendors-header">
      <h3 className="vendor-menu">Vendors Engagement</h3>
    </div>
     
    <div className="table-header custom-row">
      <div className="custom-col-6">Name</div>
      <div className="custom-col-3">Start Date</div>
      <div className="custom-col-3">End Date</div>
    </div>

    <div className="table-body">
      <div className="table-row">
        <div className="custom-row">
          <div className="custom-col-6 row-content">
            Spicy Food
          </div>
          <div className="custom-col-3 start-date">2018/12/03</div>
          <div className="custom-col-3">2018/12/09</div>
    
        </div>
      </div>
    </div>
  </div>
);

export default Engagements;