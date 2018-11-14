/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import { Engagements } from '../../../../components/Admin/Engagements/Index';
import engagements from '../../../__mocks__/mockEngagements';


const setup = () => {
  const props = {
    engagements,
    isLoading: false,
    fetchEngagements: jest.fn()
  };
  
  return mount(<Engagements {...props} />);
};

const wrapper = setup();

describe('Engagements Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an EngagementCard component', () => {
    expect(wrapper.find('EngagementCard').exists()).toBe(true);
  });

  it('should call renderEngagement method', () => {
    const renderEngagementSpy = jest.spyOn(wrapper.instance(), 'renderEngagement');
    wrapper.instance().renderEngagement(engagements[0]);
    expect(renderEngagementSpy).toBeCalled();
    expect(renderEngagementSpy).toHaveBeenCalledWith(engagements[0]);
  });
});