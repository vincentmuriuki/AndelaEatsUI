import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { VendorCard } from './VendorCard';
import Loader from '../../common/Loader/Loader';
import {
  fetchVendors,
  deleteVendor
} from '../../../actions/vendorsAction';
import AddVendorModal from "./AddVendorModal";
import DeleteVendorModal from "./DeleteVendorModal";

/**
 *
 *
 * @class Vendors
 * @extends {Component}
 */
export class Vendors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayModal: false,
      displayDeleteModal: false,
      modalContent: {}
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.deleteVendor = this.deleteVendor.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchVendors();
  }
  
  /**
   * Handles form submission
   * 
   * @param {object} vendorDetails
   * 
   * @memberof Vendor
   * 
   * @returns {void}
   */
  handleSubmit(vendorDetails) {
    this.props.createVendor(vendorDetails)
      .then(() => this.toggleModal());
  }

  /**
   * Handles input fields text changes
   * 
   * @method toggleModal
   *
   * @param {object} event
   * 
   * @memberof Vendors
   * 
   * @returns {void}
   */
  toggleModal(event) {
    this.setState(preState => ({
      displayModal: !preState.displayModal
    }));
  }
  
  /**
   * 
   * @method deleteVendor
   * 
   * @param {Object} vendorId
   * 
   * @memberof vendors
   * 
   * @returns {void}
   */
  deleteVendor(vendorId) {
    this.props.deleteVendor(vendorId)
      .then(() => this.closeDeleteModal());
  }

  /**
   * 
   * @method showDeleteModal
   *
   * @param {object} vendor
   * 
   * @memberof Vendors
   * 
   * @returns {void}
   */
  showDeleteModal(vendor) {
    this.setState({
      displayDeleteModal: true,
      modalContent: vendor
    });
  }

  /**
   * 
   * @method closeDeleteModal
   *
   * @param {object} vendor
   * 
   * @memberof Vendors
   * 
   * @returns {void}
   */
  closeDeleteModal(vendor) {
    this.setState({ displayDeleteModal: false });
  }

  
  /**
   * @method renderVendor
   *
   * @memberof Vendors
   *
   * @param {object} vendor
   *
   * @returns {JSX}
   */
  renderVendor = (vendor) => {
    const rating = Math.ceil(Math.random() * 5);
    return (
      <VendorCard 
        key={vendor.id}
        vendor={vendor}
        rating={rating}
        showDeleteModal={this.showDeleteModal}
      />
    );
  }

  render() {
    const {
      isLoading, vendors, isCreating, isDeleting 
    } = this.props;
    const { displayModal, displayDeleteModal, modalContent } = this.state;
    return (
      <div>
        { isLoading && <Loader /> }
        { (!isLoading && vendors.length) ? (
          <div className="table-wrapper">
            <div className="vendors-header">
              <h3 className="vendor-menu">Menu</h3>
              <button 
                type="button" 
                className="vendor-button"
                onClick={this.toggleModal}
              >
                Add Vendor
              </button>
            </div>

            <div className="table-header custom-row">
              <div className="custom-col-4">Name</div>
              <div className="custom-col-2">Contacts</div>
              <div className="custom-col-2">Start Date</div>
              <div className="custom-col-2">End Date</div>
              <div className="custom-col-3">Rating</div>
              <div className="custom-col-3">Options</div>
            </div>

            { vendors.map((vendor) => (
              this.renderVendor(vendor))
            )}
          </div>) : null
        }
        {
          !isLoading && !vendors.length && (
            <div className="no-content">
              No vendor has been added yet :-(
            </div>
          )
        }
        <ToastContainer />
        <AddVendorModal
          toggleModal={this.toggleModal}
          displayModal={displayModal}
          isCreating={isCreating}
          handleSubmit={this.handleSubmit}
        />
        <DeleteVendorModal
          deleteVendor={this.deleteVendor}
          isDeleting={isDeleting}
          closeDeleteModal={this.closeDeleteModal}
          modalContent={modalContent}
          displayDeleteModal={displayDeleteModal}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ allVendors }) => {
  const {
    isLoading, isCreating, isDeleting, vendors 
  } = allVendors;
  return {
    isLoading, isCreating, isDeleting, vendors 
  };
};

Vendors.propTypes = {
  deleteVendor: PropTypes.func,
  isLoading: PropTypes.bool,
  isCreating: PropTypes.bool,
  createVendor: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool,
  vendors: PropTypes.arrayOf(PropTypes.shape({})),
  fetchVendors: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { fetchVendors, deleteVendor }
)(Vendors);
