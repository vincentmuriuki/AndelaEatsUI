/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { OrderHistory } from '../../../../components/Admin/OrderHistory/Index';
import orders from '../../../__mocks__/mockOrders';

const setup = (isLoading) => {
  const props = {
    fetchOrders: jest.fn(),
    orders,
    isLoading,
  };

  return (mount(<OrderHistory {...props} />));
};

let wrapper;

describe('Orders Component', () => {
  it('should render correctly', () => {
    wrapper = setup(false);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should render loader component when fetching meal orders', () => {
    wrapper = setup(true);
    const loader = wrapper.find('div.loader-container');
    expect(loader.exists()).toBe(true);
    expect(loader.length).toBe(1);
  });

  it('should unmount loader node once api request is done', () => {
    wrapper = setup(false);
    const loader = wrapper.find('div.loader-container');
    expect(loader.exists()).toBe(false);
    expect(loader.length).toBe(0);
  });
});
