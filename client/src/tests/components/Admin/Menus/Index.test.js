/* eslint-disable no-undef */


import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Menus, { Menus as MenuClass } from '../../../../components/Admin/Menus/Index';

import Loader from '../../../../components/common/Loader/Loader';
import { FETCH_MENUS_FAILURE } from '../../../../actions/actionTypes';
import { menuItem } from '../../../__mocks__/mockMenuItems';


const menusState = {
  error: {
    status: false,
    message: null
  },
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  menuList: [],
  vendorEngagements: [],
  isDeleting: false,
};

const props = {
  fetchMenus: jest.fn(),
  fetchVendorEngagements: jest.fn(),
  deleteMenuItem: jest.fn().mockImplementation(() => Promise.resolve()),
  fetchMealItems: jest.fn(),
  createMenu: jest.fn().mockImplementation(() => Promise.resolve()),
  updateMenu: jest.fn().mockImplementation(() => Promise.resolve()),
  menus: { ...menusState }
};

const mountComponent = () => {
  const store = mockStore({
    menus: { ...menusState }
  });

  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Menus />
      </BrowserRouter>
    </Provider>
  );
};

describe('Admin: Menu Component', () => {
  it('should render loader', () => {
    menusState.isLoading = true;
    const wrapper = mountComponent();

    expect(wrapper.find(Loader).length).toEqual(1);
  });

  it('should render error', () => {
    menusState.isLoading = false;
    menusState.error.status = true;
    const wrapper = mountComponent();

    expect(wrapper.find('.no-content').length).toEqual(1);
  });

  it('should render empty menus items', () => {
    menusState.isLoading = false;
    menusState.error.status = false;
    const wrapper = mountComponent();

    expect(wrapper.find('.empty-content').length).toEqual(1);
  });

  it('should render menus items', () => {
    menusState.menuList = [{
      mealId: 1,
      mainMealId: 1453,
      id: 1,
      mainMeal: 'Rice',
      sideItems: ['Plantain'],
      proteinItems: ['Fish'],
      allowedSide: 1,
      allowedProtein: 1
    }];
    const wrapper = mountComponent();

    expect(wrapper.find('.custom-table').length).toEqual(1);
  });

  it('should call showAddModal method', () => {
    const wrapper = shallow(<MenuClass {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'showAddModal');
  
    wrapper.setState({
      displayModal: true,
      modalTitle: 'ADD MENU',
      modalButtontext: 'Add Menu'
    });
    wrapper.instance().showAddModal();
    expect(spy).toHaveBeenCalled();
  });
  
  it('should call showEditModal method', () => {
    const wrapper = shallow(<MenuClass {...props} />);

    const spy = jest.spyOn(wrapper.instance(), 'showEditModal');
    wrapper.instance().showEditModal(menuItem);

    expect(spy).toHaveBeenCalled();
  });
  
  it('should call closeModal method', () => {
    const wrapper = shallow(<MenuClass {...props} />);
    const closeModalSpy = jest.spyOn(wrapper.instance(), 'closeModal');
    wrapper.instance().closeModal();

    expect(closeModalSpy).toHaveBeenCalled();
  });
  
  it('should call handleSubmit method with empty id', () => {
    const wrapper = shallow(<MenuClass {...props} />);
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const id = '';
    wrapper.instance().handleSubmit(id, {});

    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should call handleSubmit method with given id', () => {
    const wrapper = shallow(<MenuClass {...props} />);
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const id = 1;
    wrapper.instance().handleSubmit(id, {});

    expect(handleSubmitSpy).toHaveBeenCalled();
  });
  
  it('should call handelViewMenu method', () => {
    const wrapper = shallow(<MenuClass {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'handelViewMenu');
    wrapper.instance().handelViewMenu();

    expect(spy).toHaveBeenCalled();
  });
  
  it('should call onChange method', () => {
    const wrapper = shallow(<MenuClass {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange({}, {});
  
    expect(spy).toHaveBeenCalled();
  });
  
  it('should call showDeleteModal method', () => {
    const wrapper = shallow(<MenuClass {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'showDeleteModal');
    wrapper.instance().showDeleteModal();
    expect(spy).toHaveBeenCalled();
  });
  
  it('should call deleteMenu method', () => {
    const wrapper = shallow(<MenuClass {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'deleteMenu');
    wrapper.instance().deleteMenu(1);
    expect(spy).toHaveBeenCalled();
  });
}); 
