import React from 'react';
import { shallow } from 'enzyme';
import { MealOptions, Menus } from '../../../components/Order/Menus';
import { mockMenu, match } from '../../helpers/mockOrders';

/* 
global jest 
expect 
*/
describe('MealOptions Component', () => {
  const mealOptions = [];
  const title = 'Test Meal';
  const selectedMealId = 1;
  const wrapper = shallow(
    <MealOptions
      mealOptions={mealOptions}
      title={title}
      selectedMealId={selectedMealId}
    />
  );

  it('should mount successfully', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a title', () => {
    expect(wrapper.find('h3').contains(title)).toBeTruthy();
  });
});

describe('Menus Component', () => {
  const toggleModal = jest.fn();
  const wrapper = shallow(<Menus match={match} data={mockMenu} toggleModal={toggleModal} />);

  it('should mount successfully', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have mealOptions', () => {
    expect(wrapper.find('MealOptions').length).toBeGreaterThan(0);
  });
});
