import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import ImageView from './ImageView';
import AddMealFields from './AddMealFields';

import {
  validateAddMealImage, generateFormData
} from '../../../../helpers/mealsHelper';

import {
  addMealItem, setAddMealErrors
} from '../../../../actions/admin/mealItemsAction';

/**
 *
 *
 * @class Vendors
 * 
 * @extends {Component}
 */
class AddMealModal extends Component {
  static initalState = {
    image: {
      file: null,
      dataurl: null,
      error: null
    },

    name: '',
    type: '',
    desc: '',
  };

  constructor(props) {
    super(props);
    this.imageInput = createRef();
    autoBind(this);
  
    this.mealTypes = [
      'Main',
      'Side',
      'Protein',
      'Soup'
    ];

    this.state = {
      ...AddMealModal.initalState
    };
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props;
    if (prevProps.show && !show) {
      this.clearModal();
    }
  }

  onChange(event) {
    const { errors } = this.props;
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (errors.length > 0) {
      this.props.setAddMealErrors([]);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const formData = generateFormData(
      this.state,
      this.mealTypes
    );
    
    if (Array.isArray(formData)) {
      this.props.setAddMealErrors(formData);
    } else {
      this.props.addMealItem(formData);
    }
  }

  clearModal() {
    this.props.setAddMealErrors([]);

    this.setState({
      ...AddMealModal.initalState
    });

    if (this.imageInput.current) {
      this.imageInput.current.value = '';
    }
  }

  closeModal() {
    this.clearModal();
    this.props.toggleAddModal();
  }

  openFileDialog() {
    const { current: element } = this.imageInput;
    if (!element) return;

    element.click();
  }

  previewImage() {
    const { current: element } = this.imageInput;
    if (!element) return;

    const image = element.files[0];
    const status = validateAddMealImage(image);
    if (status === true) {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({
          image: {
            file: image,
            dataurl: reader.result,
            error: null
          }
        });
      };
      reader.readAsDataURL(image);
    } else {
      this.setState({
        image: {
          file: null,
          dataurl: null,
          error: status
        }
      });
    }
  }

  render() {
    const {
      show, errors, isLoading, addBtnDisabled
    } = this.props;
  
    const {
      name, type, desc, image: { dataurl }
    } = this.state;
  
    let { error } = this.state.image;

    error = (error === null && errors.includes('image'))
      ? 'No image has been selected'
      : error;

    return (
      <div
        className="modal"
        id="add-meal-modal"
        style={show ? { display: 'block' } : { display: 'none' }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">ADD MEAL</div>
            <div>
              <button
                tabIndex={0}
                type="button"
                className="close-icon btn-no-style"
                onClick={this.closeModal}
              >
                X&nbsp;&nbsp;Close
              </button>
            </div>
          </div>

          <form id="add-meal-form" onSubmit={this.onSubmit}>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={this.imageInput}
              onChange={this.previewImage}
            />

            <main>
              <div>
                Upload meal thumbnail. &nbsp;
                <Link
                  to="#"
                  onClick={this.openFileDialog}
                >
                  Select from computer
                </Link>
              </div>

              <ImageView
                openFileDialog={this.openFileDialog}
                error={error}
                dataurl={dataurl}
              />

              <AddMealFields
                state={{
                  name,
                  desc,
                  type
                }}
                errors={errors}
                onChange={this.onChange}
                mealTypes={this.mealTypes}
              />
            </main>

            <div className="modal-footer">
              <div>
                <div
                  className="loader-wheel"
                  style={{ display: isLoading ? 'inline-block' : 'none' }}
                />
              </div>

              <button
                type="button"
                className="grayed"
                onClick={this.closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={addBtnDisabled}
              >
                Add meal
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddMealModal.propTypes = {
  show: PropTypes.bool,
  toggleAddModal: PropTypes.func.isRequired,
  addMealItem: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
  addBtnDisabled: PropTypes.bool,
  setAddMealErrors: PropTypes.func.isRequired
};

const mapStateToProps = ({ mealItems: { addMealModal } }) => ({
  isLoading: addMealModal.isLoading,
  addBtnDisabled: addMealModal.addBtnDisabled,
  errors: addMealModal.errors
});

export default connect(mapStateToProps, {
  addMealItem,
  setAddMealErrors
})(AddMealModal);
