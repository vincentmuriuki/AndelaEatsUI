import React from 'react';
import { shallow } from 'enzyme';
import { MealOptions, Menus } from '../../../components/Order/Menus';
import { mockMenu, match } from '../../helpers/mockOrders';

const props = {
  data: mockMenu,
  mealOptions: mockMenu,
  title: 'Test Meal',
  selectedMealId: 1,
  toggleModal: jest.fn(),
  selectMeal: jest.fn(),
  match,
  resetMenu: jest.fn(),
  updateSelection: jest.fn()
};

let wrapper;
/* 
global jest 
expect 
*/
describe('MealOptions Component', () => {
  it('should mount successfully', () => {
    wrapper = shallow(<MealOptions {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should have a title', () => {
    wrapper = shallow(<MealOptions {...props} />);
    expect(wrapper.find('h3').contains(props.title)).toBeTruthy();
  });

  describe('class methods test', () => {
    it('onChange method', () => {
      const mealId = 1;

      const selectMealSpy = jest.spyOn(props, 'updateSelection');
      wrapper = shallow(<MealOptions {...props} />);
      wrapper.instance().onChange(mealId, true);

      expect(selectMealSpy).toHaveBeenCalled();
    });
  });
});

describe('Menus Component', () => {
  it('should mount successfully', () => {
    wrapper = shallow(<Menus {...props} />);
    expect(wrapper).toBeDefined();
  });

  describe('class methods test', () => {
    it('updateSelection method', () => {
      const mealCategory = 'main';
      const mealId = 1;

      const selectMealSpy = jest.spyOn(props, 'selectMeal');
      wrapper = shallow(<Menus {...props} />);
      wrapper.instance().updateSelection(mealCategory, mealId);

      expect(selectMealSpy).toHaveBeenCalled();
    });

    it('resetMenus method', () => {
      const resetMenuSpy = jest.spyOn(props, 'resetMenu');
      wrapper = shallow(<Menus {...props} />).instance();

      wrapper.resetMenus();

      expect(resetMenuSpy).toHaveBeenCalled();
      expect(wrapper.state).toEqual({
        mainMeal: '', acc1: '', acc2: '', isLoading: true,
      });
    });
  });
});
