import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { VendorCard } from './VendorCard';
import Loader from '../../common/Loader/Loader';
import { fetchVendors } from '../../../actions/vendorsAction';
import AddVendorModal from "./AddVendorModal";

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
      displayModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchVendors();
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
    event.preventDefault();
    this.setState(preState => ({
      displayModal: !preState.displayModal
    }));
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
    return <VendorCard key={vendor.id} vendor={vendor} rating={rating} />;
  }

  render() {
    const { isLoading, vendors } = this.props;
    const { displayModal } = this.state;
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
        <AddVendorModal
          toggleModal={this.toggleModal}
          displayModal={displayModal}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ allVendors }) => {
  const { isLoading, vendors } = allVendors;
  return { isLoading, vendors };
};

Vendors.propTypes = {
  isLoading: PropTypes.bool,
  vendors: PropTypes.arrayOf(PropTypes.shape({})),
  fetchVendors: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { fetchVendors }
)(Vendors);
