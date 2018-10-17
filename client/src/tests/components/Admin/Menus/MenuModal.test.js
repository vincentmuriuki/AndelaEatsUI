/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import MenuModal from '../../../../components/Admin/Menus/MenuModal';
import { mockMenuItem } from '../../../__mocks__/mockMenuItems';

describe('MenuModal Component', () => {
  const setup = () => {
    const props = {
      closeModal: jest.fn(),
      handleSubmit: jest.fn(),
      vendorEngagements: [
        {
          vendorId: '',
          vendor: { name: '' },
          startDate: '',
          endDate: ''
        }
      ]
    };

    return shallow(<MenuModal {...props} />);
  };

  const wrapper = setup();
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call formValidation method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'formValidation');
    const event = { preventDefault: jest.fn() };
    wrapper.instance().formValidation(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onChange method', () => {
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange([mockMenuItem[0]], 'menuItem');
    expect(onChangeSpy).toHaveBeenCalled();
    expect(wrapper.state().menuItem).toEqual([mockMenuItem[0]]);
  });

  it('should call handleCloseModal method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleCloseModal');
    const event = { preventDefault: jest.fn() };
    wrapper.instance().handleCloseModal(event);
    expect(spy).toHaveBeenCalled();
  });
});
