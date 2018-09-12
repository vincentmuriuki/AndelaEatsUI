import React from 'react';
import PropTypes from 'prop-types';

const MealCard = (props) => {
  const {
    name,
    image,
    category,
    vendor
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
        <div>
          Vendor &nbsp;
          <a href={vendor.url}>{vendor.name}</a>
        </div>

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
  name: PropTypes.string,
  vendor: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  })
};

export default MealCard;
