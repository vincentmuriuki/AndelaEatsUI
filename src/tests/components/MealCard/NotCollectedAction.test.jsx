import React from 'react';
import { shallow } from 'enzyme';
import NotCollectedAction from '../../../components/MealCard/NotCollectedAction'; //eslint-disable-line

const props = {
  id: '0023',
  baseUrl: '/orders',
};
/* 
global jest 
expect 
*/
describe('NotCollectedAction Component', () => {
  const wrapper = shallow(<NotCollectedAction {...props} />);

  it('should render atleast once', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
