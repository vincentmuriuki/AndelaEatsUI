import React from 'react';
import { shallow } from 'enzyme';
import { Orders } from '../../../components/Order/Orders';

/* 
global jest 
expect 
*/
describe('Orders Component', () => {
  const getUpComingMenus = jest.fn();
  const menus = [{}];
  const match = {
    url: 'http:abc.css'
  };
  const wrapper = shallow(
    <Orders menus={menus} getUpComingMenus={getUpComingMenus} match={match} />
  );

  it('should mount successfully', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have an orders-wrapper div', () => {
    expect(wrapper.find('.orders-wrapper').length).toBeGreaterThan(0);
  });
});
