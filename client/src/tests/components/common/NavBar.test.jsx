import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedNavBar, { Navbar } from '../../../components/common/Navbar/Navbar'; //eslint-disable-line

const props = {
  activeUser: {
    name: 'Larrystone Yakov',
    picture: ''
  },
  logoutActiveUser: jest.fn(),
  loadActiveUser: jest.fn(),
  history: {
    push: jest.fn()
  }
};

let wrapper;
/* 
global jest 
expect 
*/
describe('NotCollectedAction Component', () => {
  it('should render atleast once', () => {
    wrapper = shallow(<Navbar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Class methods test', () => {
    it('componentDidUpdate method', () => {
      const prevProp = { ...props, activeUser: { name: 'Bamboo HR' } };
      wrapper = shallow(<Navbar {...props} />);
      wrapper.instance().componentDidUpdate(prevProp);
      expect(wrapper.instance().state.activeUser).toBe(props.activeUser);
    });

    it('logOutUser method', () => {
      const logOutSpy = jest.spyOn(props, 'logoutActiveUser');
      wrapper = shallow(<Navbar {...props} />);
      wrapper.instance().logOutUser();
      expect(logOutSpy).toHaveBeenCalled();
    });
  });
});


describe('ConnectedNavbar component', () => {
  it('renders successfully', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({
      userReducer: {
        activeUser: {}
      }
    });
    wrapper = shallow(<ConnectedNavBar store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
});