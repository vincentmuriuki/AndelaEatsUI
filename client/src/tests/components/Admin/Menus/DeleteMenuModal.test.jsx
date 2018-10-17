/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import DeleteMenuModal
  from '../../../../components/Admin/Menus/DeleteMenuModal';

const props = {
  closeModal: jest.fn(),
  mainMeal: 'Rice',
  id: 2,
  deleteMenu: jest.fn(),
  deleting: false
};

const wrapper = mount(<DeleteMenuModal {...props} />);

describe('Admin::DeleteModal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call deleteMenu onClick of Delete button', () => {
    const deleteButton = wrapper.find('#delete-meal');
    deleteButton.simulate('click');
    expect(props.deleteMenu).toHaveBeenCalled();
    expect(props.deleteMenu).toBeCalledWith(2);
  });

  it('should call closeModal onClick of Cancel button', () => {
    const cancelButton = wrapper.find('.modal-footer').children().first();
    cancelButton.simulate('click');
    expect(props.closeModal).toHaveBeenCalled();
  });
});
