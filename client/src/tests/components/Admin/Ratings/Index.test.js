/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import Ratings from '../../../../components/Admin/Ratings/Index';

const setup = () => {
  return mount(<Ratings />)
}

const wrapper = setup();


describe('OrderHistory Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should have an RatingsTabs component', () => {
    expect(wrapper.find('RatingsTabs').exists()).toBe(true);
  });
  
  it('expects the following methods to be defined', () => {
    wrapper.instance().handleFilterModal();
    wrapper.instance().handleFilterSubmit();
  })
})