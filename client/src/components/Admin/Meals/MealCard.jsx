import React from 'react';
import PropTypes from 'prop-types';

const MealCard = (props) => {
  const {
    name,
    image,
    category
  } = props;

  return (
    <div className="meal-card">
      <div
        className="image"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="label-container">
        <span>{category}</span>
      </div>

      <div className="details">
        <div>{name}</div>

        <div className="controls">
          <button type="button">Edit</button>
          <button type="button">Delete</button>
        </div>
      </div>
    </div>
  );
}

MealCard.propTypes = {
  image: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string
};

export default MealCard;
