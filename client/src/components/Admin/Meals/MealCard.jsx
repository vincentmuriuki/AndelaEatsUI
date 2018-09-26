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
  description,
  showDeleteModal,
  showEditModal,
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
        <button
          type="button"
          onClick={() => {
            showEditModal({
              id, name, mealType, image, description
            }, true);
          }}
        >
        Edit
        </button>
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
  description: PropTypes.string,
  id: PropTypes.number,
  showDeleteModal: PropTypes.func,
  showEditModal: PropTypes.func,
};

export default MealCard;
