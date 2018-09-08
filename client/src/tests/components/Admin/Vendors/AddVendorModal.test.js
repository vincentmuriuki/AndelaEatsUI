import React from 'react';
import { AddVendorModal } from '../../../../components/Admin/Vendors/AddVendorModal';
import { shallow } from 'enzyme';

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

  return shallow(<AddVendorModal {...state} {...props}/>);
};

const wrapper = setup();

describe('AddVendorModal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call onChange method', ()=>{
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
});