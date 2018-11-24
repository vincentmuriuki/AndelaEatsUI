import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NotCollectedAction = ({
  id, meal, showModal
}) => (
  <div className="card-action not-collected">
    <div>
      <p className="sub-head">Status</p>
      <span className="heading">Not Collected</span>
    </div>
    <div className="item">
      <p className="sub-head">Order options</p>
      <div className="button-group">
        <Link
          to={{
            pathname: '/'
          }}
          className="button"
        >Edit
        </Link>
        <a
          className="button test"
          role="button"
          tabIndex="0"
          onClick={() => showModal(meal)}
        >Delete
        </a>
      </div>
    </div>
  </div>
);

NotCollectedAction.propTypes = {
  id: PropTypes.number,
  meal: PropTypes.shape({
    id: PropTypes.number,
    mealItems: PropTypes.array,
    rating: PropTypes.number
  }),
  showModal: PropTypes.func
};

export default NotCollectedAction;
