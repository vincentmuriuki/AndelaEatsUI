/* eslint-disable no-undef */

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Menus from '../../../../components/Admin/Menus/Index';
import { mockMenuItem } from '../../../__mocks__/mockMenuItems';

import Loader from '../../../../components/common/Loader/Loader';

const menusState = {
  error: {
    status: false,
    message: null
  },
  isLoading: false,
  menuList: [],
  vendorEngagements: [],
};

const mountComponent = () => {
  const store = mockStore({
    menus: { ...menusState }
  });

  return mount(
    <BrowserRouter>
      <Provider store={store}>
        <Menus />
      </Provider>
    </BrowserRouter>
  );
};

describe('Admin: Menu Component', () => {
  it.only('should render loader', () => {
    menusState.isLoading = true;
    const wrapper = mountComponent();

    expect(wrapper.find(Loader).length).toEqual(1);
  });

  it.only('should render error', () => {
    menusState.isLoading = false;
    menusState.error.status = true;
    const wrapper = mountComponent();

    expect(wrapper.find('.no-content').length).toEqual(1);
  });

  it.only('should render empty menus items', () => {
    menusState.isLoading = false;
    menusState.error.status = false;
    const wrapper = mountComponent();

    expect(wrapper.find('.empty-content').length).toEqual(1);
  });

  it.only('should render menus items', () => {
    menusState.menuList = [{
      mealId: 1,
      mainMealName: 'Rice',
      sideItemsAvailable: [{ mealDescription: 'Plantain' }],
      proteinItemsAvailable: [{ mealDescription: 'Fish' }],
      sideOptionsCanPick: 1,
      proteinOptionsCanPick: 1
    }];
    const wrapper = mountComponent();

    expect(wrapper.find('.custom-table').length).toEqual(1);
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
