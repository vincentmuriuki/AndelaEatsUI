import Ratings from 'react-stars';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const CollectedAction = ({ id, rating }) => (
  <div className="card-action collected">
    <div className="item">
      <p className="sub-head">Status</p>
      <span className="heading">Collected</span>
    </div>
    <Fragment>
      <div className="item">
        <p className="sub-head">Rating</p>
        <Ratings
          value={rating}
          color2="green"
          edit={false}
          name="rating"
        />
      </div>
      <div>
        <p className="sub-head">Rate this meal</p>
        <a
          className="button"
          tabIndex="0"
          role="button"
        >Rate
        </a>
      </div>
    </Fragment>
  </div>
);

CollectedAction.propTypes = {
  id: PropTypes.string.isRequired,
  rating: PropTypes.number
};

CollectedAction.defaultProps = {
  rating: 0
};

export default CollectedAction;
