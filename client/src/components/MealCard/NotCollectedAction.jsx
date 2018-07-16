import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NotCollectedAction = ({ baseUrl, id }) => (
  <div className="card-action not-collected">
    <div>
      <p className="sub-head">Status</p>
      <span className="heading">Not Collected</span>
    </div>
    <div className="item">
      <p className="sub-head">Order options</p>
      <div className="button-group">
        <Link
          to={`${baseUrl}/edit/${id}`}
          className="button"
        >Edit
        </Link>
        <a
          className="button"
          role="button"
          tabIndex="0"
        >Delete
        </a>
      </div>
    </div>
  </div>
);

NotCollectedAction.propTypes = {
  id: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired
};

export default NotCollectedAction;
