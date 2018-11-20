/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import { SuspendedVendor } from '../../../../components/Admin/SuspendedVendors/Index';
import vendors from '../../../__mocks__/mockVendors';

const setup = () => {
  const props = {
    vendors,
    isLoading: false,
    fetchSuspensions: jest.fn()
  };

  return mount(<SuspendedVendor {...props} />);
};

const wrapper = setup();


describe('Suspended Engagement', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an VendorCard component', () => {
    expect(wrapper.find('VendorCard').exists()).toBe(true);
  });

  it('should call renderVendors method', () => {
    const renderVendorspy = jest.spyOn(wrapper.instance(), 'renderVendors');
    wrapper.instance().renderVendors(vendors);
    expect(renderVendorspy).toBeCalled();
    expect(renderVendorspy).toHaveBeenCalledWith(vendors);
  });
});