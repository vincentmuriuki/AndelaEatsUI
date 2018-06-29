import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dashboard from '../Dashboard/Dashboard';
import loadingAction from '../../actions/loadingAction';

import './DashboardContainer.scss';


class DashboardContainer extends Component {
  render() {
    return(
      <div>
        <Dashboard />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = dispatch => ({
  loadingAction: status => dispatch(loadingAction(status))
})


export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
