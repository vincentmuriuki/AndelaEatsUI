import React from 'react';
import { shallow } from 'enzyme';
import ConfirmOrder from '../../../components/Order/ConfirmOrder';
import { mockMenu, match } from '../../helpers/mockOrders';

const props = {
  toggleModal: () => Promise.resolve(),
  orderMeal: () => Promise.resolve(),
  showToast: () => Promise.resolve(),
  isModalOpen: true,
  menus: mockMenu,
  match,
  mealSelected: {
    mainMeal: 1,
    accompaniment1: 1,
    accompaniment2: 1,
  }
};
let wrapper;
/* 
global jest 
expect 
*/
describe('ConfirmOrder Component', () => {
  it('should mount successfully', () => {
    wrapper = shallow(<ConfirmOrder {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Action test', () => {
    it('order meal successfully', () => {
      const orderMealSpy = jest.spyOn(props, 'orderMeal');
      wrapper = shallow(<ConfirmOrder {...props} />);
      const confirmOrderSpy = jest.spyOn(wrapper.instance(), 'confirmOrder');
      wrapper.instance().confirmOrder();
      expect(orderMealSpy).toHaveBeenCalled();
      expect(confirmOrderSpy).toHaveBeenCalled();
    });

    it('order meal failure', () => {
      props.orderMeal = () => Promise.reject();
      const orderMealSpy = jest.spyOn(props, 'orderMeal');
      wrapper = shallow(<ConfirmOrder {...props} />);
      const confirmOrderSpy = jest.spyOn(wrapper.instance(), 'confirmOrder');
      wrapper.instance().confirmOrder();
      expect(orderMealSpy).toHaveBeenCalled();
      expect(confirmOrderSpy).toHaveBeenCalled();
    });
  });
});