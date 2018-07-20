import React from 'react';
import { shallow } from 'enzyme';
import ConfirmOrder from '../../../components/Order/ConfirmOrder';
import { mockMenu, match } from '../../helpers/mockOrders';

/* 
global jest 
expect 
*/
describe('ConfirmOrder Component', () => {
  const toggleModal = jest.fn();
  const mealSelected = {
    mainMeal: 1,
    accompaniment1: 1,
    accompaniment2: 1,
  };
  const wrapper = shallow(
    <ConfirmOrder
      toggleModal={toggleModal}
      isModalOpen
      menus={mockMenu}
      match={match}
      mealSelected={mealSelected}
    />
  );

  it('should mount successfully', () => {
    expect(wrapper).toBeDefined();
  });
  
});