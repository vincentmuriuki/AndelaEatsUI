/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import { OrdersHeader } from '../../../../components/Admin/OrderHistory/OrdersHeader';

const setup = () => {
  const props = {
    title: '',
    isLoading: false,
    fetchOrders: jest.fn(),
    orders: [],
    redirectToExport: jest.fn()
  }

  return mount(<OrdersHeader {...props} />)
}

const wrapper = setup();


describe('OrdersHeader Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
  
  it('expects the following methods to be defined', () => {
    wrapper.instance().handleSubmit();
    wrapper.instance().toggleFilterModal();
  })
})