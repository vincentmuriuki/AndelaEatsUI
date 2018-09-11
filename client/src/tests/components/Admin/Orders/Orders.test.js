/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import Orders from '../../../../components/Admin/Orders/Orders';

const wrapper = mount(<Orders />);

describe('Orders Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
