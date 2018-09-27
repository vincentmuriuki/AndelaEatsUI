/* eslint-disable no-undef */

import React from 'react';
import { shallow } from 'enzyme';
import Menus from '../../../../components/Admin/Menus/Index';
import { mockMenuItem } from '../../../__mocks__/mockMenuItems';

describe('Admin: Menu Component', () => {
  const wrapper = shallow(<Menus />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call showAddModal method', () => {
    const showDeleteModalSpy = jest
      .spyOn(wrapper.instance(), 'showAddModal');
    const modalContent = {
      displayModal: true,
      modalTitle: 'ADD MENU',
      modalButtontext: 'Add Menu'
    };
    wrapper.instance().showAddModal(modalContent);
    expect(showDeleteModalSpy).toHaveBeenCalled();
  });

  it('should call closeModal method', () => {
    const closeModalSpy = jest.spyOn(wrapper.instance(), 'closeModal');
    wrapper.instance().closeModal();
    expect(closeModalSpy).toHaveBeenCalled();
  });


  it('should call handleSubmit method', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().handleSubmit();
    expect(handleSubmitSpy).toHaveBeenCalled();
  });
});
