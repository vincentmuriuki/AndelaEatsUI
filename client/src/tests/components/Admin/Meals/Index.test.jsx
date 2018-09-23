/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import { shallow } from 'enzyme';
import { Meals } from '../../../../components/Admin/Meals/Index';
import { mealItems } from '../../../__mocks__/mockMealItems';

const setup = (isLoading, meals = []) => {
  const props = {
    isLoading,
    meals,
    showAddMealModal: jest.fn(),
    fetchMealItems: jest.fn(),
  };
  return (shallow(<Meals {...props} />));
};

describe('Admin:Meals Component', () => {
  let wrapper = setup(false);
  const mealsInstance = wrapper.instance();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('', () => {
    mealsInstance.renderMeal({});
  });

  it('', () => {
    mealsInstance.toggleAddModal();
  });
  
  it('', () => {
    wrapper = setup(false, mealItems);
    mealsInstance.toggleAddModal();
  });

  it('', () => {
    wrapper = setup(true, mealItems);
    mealsInstance.toggleAddModal();
  });
});
