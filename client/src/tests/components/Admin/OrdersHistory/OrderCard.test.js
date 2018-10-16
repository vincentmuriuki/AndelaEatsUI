/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import OrderCard from '../../../../components/Admin/OrderHistory/OrderCard';
import orders from '../../../__mocks__/mockOrders';

const setup = (status, showStatus) => {
  const props = {
    order: orders[0],
    status,
    showStatus
  };

  return (mount(<OrderCard {...props} />));
};

let wrapper = setup(true, true);

describe('OrderCard Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should display "Collected" if order status is true', () => {
    const statusSpan = wrapper.find('.options-wrapper > span');
    expect(statusSpan.text()).toEqual('Collected');
  });

  it('should display "Not Collected" if order status is false', () => {
    wrapper = setup(false, true);
    const statusSpan = wrapper.find('.options-wrapper > span');
    expect(statusSpan.text()).toEqual('Not Collected');
  });

  it('should not have status column', () => {
    wrapper = setup(false, false);
    const statusSpan = wrapper.find('.options-wrapper > span');
    expect(statusSpan.length).toEqual(0);
  });
});
