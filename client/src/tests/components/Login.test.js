import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../components/Login/Login';

/* 
global jest 
expect 
*/
describe('Login Component', () => {
  const wrapper = shallow(<Login />);

  it('should render atleast once', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('renders a div', () => {
    expect(wrapper.find('div').length).toBeGreaterThan(0);
  });

  it('always renders a form submit button ', () => {
    expect(wrapper.find('.login-button').length).toEqual(1);
  });
});
