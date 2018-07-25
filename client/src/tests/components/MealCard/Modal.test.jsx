import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../components/MealCard/Modal'; //eslint-disable-line

const props = {
  displayModal: jest.fn(),
  closeModal: jest.fn(),
  deleteOrder: jest.fn(),
  modalContent: {
    id: "123",
    name: {
      main: "Wheat",
      protein: "Ace"
    }
  }
};
/* 
global jest 
expect 
*/
describe('Modal Component', () => {
  const wrapper = shallow(<Modal {...props} />);

  it('should render atleast once', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should open modal and delete order', () => {
    wrapper.find('.delete-order').simulate('onClick');
  });
});
