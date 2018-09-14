/* eslint-disable no-undef */
import React, { Component } from 'react';
import { mount } from 'enzyme';
import { Vendors } from '../../../../components/Admin/Vendors/Vendors';
import vendors from '../../../__mocks__/mockVendors';

const modalContent = {
  contactPerson: "Chibueze",
  createdAt: "Fri, 14 Sep 2018 06:52:30 GMT",
  id: "-LMLqYeE1Ubdy79p4Nwo",
  phoneNumber: "01234567890",
  updatedAt: "Fri, 14 Sep 2018 06:52:30 GMT",
  vendorAddress: "No 233, Ikorodu road, Lagos",
  vendorName: "Mr Medium"
};

const setup = (isLoading) => {
  const props = {
    vendors,
    isLoading,
    fetchVendors: jest.fn(),
    createVendor: jest.fn().mockImplementation(() => Promise.resolve()),
    deleteVendor: jest.fn().mockImplementation(() => Promise.resolve())
  };

  return mount(<Vendors {...props} />);
};

const wrapper = setup(false);

describe('Vendors Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a VendorCard component', () => {
    expect(wrapper.find('VendorCard').exists()).toBe(true);
  });

  it('should call renderVendor method', () => {
    const renderVendorSpy = jest.spyOn(wrapper.instance(), 'renderVendor');
    wrapper.instance().renderVendor(vendors[0]);
    expect(renderVendorSpy).toHaveBeenCalled();
    expect(renderVendorSpy).toHaveBeenCalledWith(vendors[0]);
  });

  it('should call toggleModal method', () => {
    const toggleModalSpy = jest.spyOn(wrapper.instance(), 'toggleModal');
    const event = { preventDefault: jest.fn() };
    wrapper.instance().toggleModal(event);
    expect(toggleModalSpy).toHaveBeenCalled();
  });

  it('should call handleSubmit method', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const event = { preventDefault: jest.fn() };
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should call deleteVendor method', () => {
    const deleteVendorSpy = jest.spyOn(wrapper.instance(), 'deleteVendor');
    wrapper.instance().deleteVendor();
    expect(deleteVendorSpy).toHaveBeenCalled();
  });

  it('should call closeDeleteModal method', () => {
    const closeDeleteModalSpy = jest
      .spyOn(wrapper.instance(), 'closeDeleteModal');
    const event = { preventDefault: jest.fn() };
    wrapper.instance().closeDeleteModal();
    expect(closeDeleteModalSpy).toHaveBeenCalled();
  });

  it('should call closeDeleteModal method', () => {
    const showDeleteModalSpy = jest
      .spyOn(wrapper.instance(), 'showDeleteModal');
    wrapper.instance().showDeleteModal(modalContent);
    expect(showDeleteModalSpy).toHaveBeenCalled();
  });
});
