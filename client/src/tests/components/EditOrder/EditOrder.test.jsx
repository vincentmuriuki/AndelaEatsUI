import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import ConnectedEditOrder, { EditOrder } from '../../../components/EditOrder/EditOrder';

/* 
global jest 
expect 
*/
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let mountedComponent;
const props = {
  match: {
    params: { id: 1 },
    url: '/orders/edit/000023"'
  },
  menu: {
    date: "2018-07-19",
    id: 2001,
    meal: {
      main: [],
      firstAccompaniment: [],
      secondAccompaniment: []
    }
  },
  editOrder: () => Promise.resolve(),
};

/**
 * @description Initialise the component
 *
 * @returns {object} ManageRecipe - Mounted component
 */
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<EditOrder {...props} />);
  }
  return mountedComponent;
};

describe('Component: Orders', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(getComponent()).toMatchSnapshot();
  });

  describe('Class Methods test:: Call', () => {
    it('componentDidMount()', () => {
      const spy = jest.spyOn(EditOrder.prototype, 'componentDidMount');
      getComponent().instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
    });

    it('handleOptionChange()', () => {
      const event = {
        target: {
          name: "searchParam",
          value: "Rice Beans"
        },
        preventDefault: () => jest.fn()
      };

      const wrapper = getComponent().instance();

      const spy = jest.spyOn(wrapper, 'handleOptionChange');
      wrapper.handleOptionChange(event);
      expect(spy).toHaveBeenCalled();
      expect(wrapper.state.searchParam).toBe(event.target.value);
    });
  });
});


describe('Connected EditOrder component', () => {
  it('component successfully rendered', () => {
    const store = mockStore({
      orders: {
        menu: {}
      }
    });
    const wrapper = shallow(<ConnectedEditOrder store={store} />);
    expect(wrapper.length).toBe(1);
  });
});