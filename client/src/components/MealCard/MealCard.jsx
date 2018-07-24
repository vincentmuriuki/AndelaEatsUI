import React from 'react';
import PropTypes from 'prop-types';
import CollectedAction from './CollectedAction';
import NotCollectedAction from './NotCollectedAction';
import dateFormatter from '../../helpers/dateFormatter';

const MealCard = ({
  url,
  meal,
  meal: {
    id, name: { main, protein }, imageUrl, orderDate, isCollected, rating
  },
  showModal
}) => (
  <div className="card-container">
    <div className="card-image" style={{ backgroundImage: `url(${imageUrl})` }}>
      <p className={`order-id ${isCollected ? "not-collected" : "collected"}`}>
        {`#${id}`}
      </p>
    </div>
    <div>
      <div className="card-details">
        <div className="main">
          <p className="heading">{`${main} ${protein}`}</p>
          <p>
            <span className="sub-head">Order date&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="heading">{dateFormatter(orderDate)}</span>
          </p>
        </div>

        {isCollected
          ? (
            <CollectedAction 
              id={id} 
              rating={+rating} 
            />
          )
          : (
            <NotCollectedAction 
              id={id} 
              baseUrl={url}
              meal={meal}
              showModal={showModal}
            />
          )}
      </div>
    </div>
  </div>
);

MealCard.propTypes = {
  url: PropTypes.string.isRequired,
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
  }).isRequired,
  showModal: PropTypes.func
};

export default MealCard;
