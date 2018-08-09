import React from 'react';
import { shallow } from 'enzyme';
import NotCollectedAction from '../../../components/MealCard/NotCollectedAction'; //eslint-disable-line

const props = {
  id: '0023',
  baseUrl: '/orders',
  meal: {
    id: '2',
    name: {
      main: "Beans",
      protein: "Cake"
    },
    orderDate: '2/5/2018'
  },
  showModal: () => Promise.resolve()
};

let wrapper;
/* 
global jest 
expect 
*/
describe('NotCollectedAction Component', () => {
  it('should render atleast once', () => {
    wrapper = shallow(<NotCollectedAction {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call showModal method from prop', () => {
    const buttonSpy = jest.spyOn(props, 'showModal');
    wrapper = shallow(<NotCollectedAction {...props} />);
    wrapper.find('.button.test').simulate('click');
    expect(buttonSpy).toHaveBeenCalled();
  });
});
