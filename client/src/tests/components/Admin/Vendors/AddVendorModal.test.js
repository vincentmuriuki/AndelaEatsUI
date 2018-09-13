import React, { Component } from 'react';
import { shallow } from 'enzyme';
import {
  AddVendorModal 
} from '../../../../components/Admin/Vendors/AddVendorModal';


const setup = () => {
  const props = {
    displayModal: true,
    toggleModal: jest.fn()
  };

  const state = {
    name: '',
    address: '',
    contact: '',
    startDate: '',
    endDate: '',
  };

  return shallow(<AddVendorModal {...state} {...props} />);
};

const wrapper = setup();

describe('AddVendorModal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call onChange method', () => {
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'name',
        value: 'Chibueze'
      }
    };
    wrapper.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
    expect(wrapper.state().name).toBe('Chibueze');
  });

  it('should call closeModal method', () => {
    const closeModalSpy = jest.spyOn(wrapper.instance(), 'closeModal');
    wrapper.instance().closeModal();
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should call clearErrors method', () => {
    const clearErrorsSpy = jest.spyOn(wrapper.instance(), 'clearErrors');
    wrapper.instance().clearErrors();
    expect(clearErrorsSpy).toHaveBeenCalled();
  });

  it('should call formValidation method', () => {
    const formValidationSpy = jest.spyOn(wrapper.instance(), 'formValidation');
    const event = { preventDefault: jest.fn() };
    wrapper.instance().formValidation(event);
    expect(formValidationSpy).toHaveBeenCalled();
  });
});
