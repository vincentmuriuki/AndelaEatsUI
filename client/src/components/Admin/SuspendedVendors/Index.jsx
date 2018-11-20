import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropType from 'prop-types';

import Loader from '../../common/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { VendorCard } from './VendorCard';
import { 
  fetchSuspensions
} from '../../../actions/admin/suspendedVendorAction';
import EmptyContent from '../../common/EmptyContent';


/**
 * @class SuspendedVendor
 * 
 * 
 * @extends {Component}
 */
export class SuspendedVendor extends Component {  
  componentDidMount() {
    this.props.fetchSuspensions();
  }
   
  renderVendors = vendors => {
    return vendors.map((vendor, key) => (
      <VendorCard 
        key={key}
        vendor={vendor}
      />
    ))
  };

  render() {
    const { isLoading, vendors } = this.props;

    return (
      <Fragment>
        { isLoading && <Loader /> }
        <div className={`${isLoading && 'blurred'} table-wrapper`}>
          <div className="vendors-header">
            <h3 className="vendor-menu">Suspended Vendors</h3>
          </div>
          
          { vendors.length > 0 && (
          <div className="table-header custom-row">
            <div className="custom-col-4">Name</div>
            <div className="custom-col-4">Address</div>
            <div className="custom-col-2">Phone</div>
            <div className="custom-col-3">Contact</div>
            <div className="custom-col-3">Options</div>
          </div>)}
      
          { vendors.length > 0 && this.renderVendors(vendors)}

          { !isLoading && !vendors.length && (
            <EmptyContent message= "No vendor has been suspended yet" />
          )}
          
        </div>
        <ToastContainer />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ suspendVendors }) => ({
  isLoading: suspendVendors.isLoading,
  vendors: suspendVendors.vendors
});

SuspendedVendor.propTypes = {
  fetchSuspensions: PropType.func.isRequired
};

export default connect(
  mapStateToProps, 
  { 
    fetchSuspensions 
  }
)(SuspendedVendor);