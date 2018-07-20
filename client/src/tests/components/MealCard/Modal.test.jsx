import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../components/MealCard/Modal'; //eslint-disable-line

const props = {
  id: '0023',
  baseUrl: '/orders',
};
/* 
global jest 
expect 
*/
describe('NotCollectedAction Component', () => {
  const wrapper = shallow(<Modal {...props} />);

  it('should render atleast once', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
