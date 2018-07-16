import React from 'react';
import { shallow } from 'enzyme';
import Meal from '../../../components/Order/Meal';

/* 
global jest 
expect 
*/
describe('Meal Component', () => {
  const onChange = jest.fn();
  const meal = {
    id: 1,
    courseType: "Main Meal",
    meal: "Rice",
    mealPicture: ''
  };
  const wrapper = shallow(<Meal meal={meal} onChange={onChange} />);

  it('should mount successfully', () => {
    expect(wrapper).toBeDefined();
  });
  it('should render meal details', () => {
    expect(wrapper.find('.meal-name').contains(meal.meal)).toBeTruthy();
  });
});
