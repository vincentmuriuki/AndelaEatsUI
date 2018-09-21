import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function MealCard
 * 
 * @param {object} { meal, showDeleteModal }
 * 
 * @returns {JSX}
 */
const MealCard = ({
  id,
  name,
  mealType,
  image, 
  showDeleteModal 
}) => (
  <div className="meal-card">
    <div
      className="image"
      style={{ backgroundImage: `url(${image})` }}
    />

    <div className="label-container">
      <span>{mealType}</span>
    </div>

    <div className="details">
      <div>{ name }</div>

      <div className="controls">
        <button type="button">Edit</button>
        <button
          type="button"
          onClick={() => showDeleteModal({ id, name })}
        >
        Delete
        </button>
      </div>
    </div>
  </div>
);

MealCard.propTypes = {
  mealType: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.number,
  showDeleteModal: PropTypes.func
};

export default MealCard;
