/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import OrderCard from '../../../../components/Admin/Orders/OrderCard';
import orders from '../../../__mocks__/mockOrders';

const setup = (status) => {
  const props = {
    order: orders[0],
    status,
  };

  return (mount(<OrderCard {...props} />));
};

let wrapper = setup(true);

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
    wrapper = setup(false);
    const statusSpan = wrapper.find('.options-wrapper > span');
    expect(statusSpan.text()).toEqual('Not Collected');
  });
});
