import React from 'react';
import { shallow } from 'enzyme';
import { MealOptions, Menus } from '../../../components/Order/Menus';

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
  const match = {
    url: 'http:abc.css',
    params: {
      id: 1
    }
  };
  const data = [
    {
      id: 1,
      courseType: "Main Meal",
      meal: "Rice",
      mealPicture: ''
    },
    {
      id: 2,
      courseType: "Main Meal",
      meal: "Wheat",
      mealPicture: ''
    }
  ];
  const wrapper = shallow(<Menus match={match} data={data} />);
  it('should mount successfully', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have mealOptions', () => {
    expect(wrapper.find('MealOptions').length).toBeGreaterThan(0);
  });
});
