/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import { shallow } from 'enzyme';
import { Meals } from '../../../../components/Admin/Meals/Index';

const setup = isLoading => {
  const props = {
    isLoading,
    meals: [],
    fetchMealItems: jest.fn(),
  };
  return (shallow(<Meals {...props} />));
};

describe('AddMealModal Component', () => {
  const wrapper = setup(false);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
