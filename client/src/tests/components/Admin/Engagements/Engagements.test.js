/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import { Engagements } from '../../../../components/Admin/Engagements/Index';
import engagements from '../../../__mocks__/mockEngagements';


const setup = () => {
  const state = {
    selectedOption: {
      vendorId: 1
    }
  };

  const props = {
    engagements,
    vendors: [],
    isLoading: false,
    fetchEngagements: jest.fn(),
    fetchVendors: jest.fn(),
    createEngagement: jest.fn().mockImplementation(() => Promise.resolve()),
    deleteEngagement: jest.fn().mockImplementation(() => Promise.resolve())
  };
  
  return mount(<Engagements {...state} {...props} />);
};

const wrapper = setup();

describe('Engagements Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an EngagementCard component', () => {
    expect(wrapper.find('EngagementCard').exists()).toBe(true);
  });

  it('should call renderEngagements method', () => {
    const renderEngagementSpy = jest.spyOn(wrapper.instance(), 'renderEngagements');
    wrapper.instance().renderEngagements(engagements);
    expect(renderEngagementSpy).toBeCalled();
    expect(renderEngagementSpy).toHaveBeenCalledWith(engagements);
  });

  it('should call showAddModal method', () => {
    const showAddModalSpy = jest.spyOn(wrapper.instance(), 'showAddModal');
    wrapper.instance().showAddModal();
    expect(showAddModalSpy).toHaveBeenCalled();
  });

  it('should call closeModal method', () => {
    const closeModalSpy = jest.spyOn(wrapper.instance(), 'closeModal');
    wrapper.instance().closeModal();
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should call handleSubmit method', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const event = { preventDefault: jest.fn() };
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  
  it('should call onChange method', () => {
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');    
    wrapper.instance().onChange(3, "selectedOption");
    expect(onChangeSpy).toHaveBeenCalled();
  });
  
  it('should call deleteEngagement method', () => {
    const deleteEngagementSpy = jest.spyOn(wrapper.instance(), 'deleteEngagement');
    wrapper.instance().deleteEngagement();
    expect(deleteEngagementSpy).toHaveBeenCalled();
  });

  it('should call showDeleteModal method', () => {
    const showDeleteModalSpy = jest
      .spyOn(wrapper.instance(), 'showDeleteModal');
    wrapper.instance().showDeleteModal();
    expect(showDeleteModalSpy).toHaveBeenCalled();
  });
});