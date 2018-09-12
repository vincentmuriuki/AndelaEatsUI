/* eslint-disable no-undef */

import React from 'react';
import { render } from 'react-testing-library';
import Meals from '../../../../components/Admin/Meals/Index';

describe('Meals Component', () => {
  const { container, queryByText } = render(<Meals />);

  it('should render a title Meals', () => {
    expect(queryByText('Meals')).not.toBe(null);
  });

  it('should render a Add meal Button', () => {
    const button = queryByText('Add meal');
    expect(button.type).toBe('button');
  });

  it('should render a least 8 MealCards', () => {
    const mealCards = container.getElementsByClassName('meal-card');
    expect(mealCards.length).toBe(8);
  });
});
