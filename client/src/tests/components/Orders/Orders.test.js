import React from 'react';
import { shallow } from 'enzyme';
import { Orders } from '../../../components/Order/Orders';

const props = {
  menus: [{}],
  match: {
    url: 'http:abc.css'
  },
  getUpComingMenus: () => Promise.resolve()
};

const context = {
  router: {
    history: {
      push: jest.fn()
    }
  }
};

/* 
global jest 
expect 
*/
describe('Orders Component', () => {
  const wrapper = shallow(
    <Orders {...props} />, { context }
  );

  it('should mount successfully', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have an orders-wrapper div', () => {
    wrapper.setState({ isLoading: false })
    expect(wrapper.find('.orders-wrapper').length).toBeGreaterThan(0);
  });
});
