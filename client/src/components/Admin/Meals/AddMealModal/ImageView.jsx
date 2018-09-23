/* eslint-disable jsx-a11y/img-redundant-alt */

import React from 'react';
import PropTypes from 'prop-types';

const ImageView = (props) => {
  const { openFileDialog, error, dataurl } = props;

  if (!dataurl) {
    return (
      <div className="image">
        <div className="control">
          <button
            className="btn-no-style"
            type="button"
            onClick={openFileDialog}
          ><i className="fas fa-plus" />
          </button>
          { error === null
            ? <span>Upload image</span>
            : <span className="error">{ error }</span>
          }
        </div>
      </div>
    );
  }

  return (
    <div className="preview">
      <img src={dataurl} alt="added meal image" />
    </div>
  );
}

ImageView.propTypes = {
  openFileDialog: PropTypes.func.isRequired,
  error: PropTypes.string,
  dataurl: PropTypes.string
};

export default ImageView;
