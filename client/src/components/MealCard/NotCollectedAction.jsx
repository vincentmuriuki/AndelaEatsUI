import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NotCollectedAction = ({
  baseUrl, id, meal, showModal 
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
          to = {{
            pathname: `${baseUrl}/edit/${id}`,
            query: { mainMeal: meal.name.main, protein: meal.name.protein }
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
  id: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  meal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isCollected: PropTypes.bool,
    name: PropTypes.shape({
      main: PropTypes.string,
      protein: PropTypes.string
    }).isRequired,
    imageUrl: PropTypes.string,
    orderDate: PropTypes.string.isRequired,
    rating: PropTypes.number
  }),
  showModal: PropTypes.func 
};

export default NotCollectedAction;
