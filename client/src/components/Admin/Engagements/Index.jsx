import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropType from 'prop-types';
import Loader from '../../common/Loader/Loader';

import { EngagementCard } from './EngagementCard';
import { fetchEngagements } from '../../../actions/admin/engagementsAction';
import EmptyContent from '../../common/EmptyContent';


/**
 * @class Engagements
 * 
 * 
 * @extends {Component}
 */
export class Engagements extends Component {

  componentDidMount() {
    this.props.fetchEngagements();
  }
  
  renderEngagement = engagement => {
    return (
      <EngagementCard 
        key={engagement.id}
        engagement={engagement}
      />
    )
  }

  render() {
    const { isLoading, engagements } = this.props;
    
    return (
      <Fragment>
        { isLoading && <Loader /> }
        <div className={`${isLoading && 'blurred'} table-wrapper`}>
          <div className="vendors-header">
            <h3 className="vendor-menu">Vendors Engagement</h3>
          </div>
          
          { engagements.length > 0 && (
          <div className="table-header custom-row">
            <div className="custom-col-6">Name</div>
            <div className="custom-col-3">Start Date</div>
            <div className="custom-col-3">End Date</div>
          </div>)}
      
          { engagements.map(engagement => (
              this.renderEngagement(engagement))
          )}

          { !isLoading && !engagements.length && (
            <EmptyContent message= "No engagement has been added yet" />
          )}
          
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ allEngagements }) => ({
  isLoading: allEngagements.isLoading,
  engagements: allEngagements.engagements
});

Engagements.propTypes = {
  fetchEngagements: PropType.func.isRequired
};

export default connect(mapStateToProps, { fetchEngagements })(Engagements);