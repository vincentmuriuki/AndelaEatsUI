/* eslint-disable no-undef */

import React from 'react';
import { shallow } from 'enzyme';
import Menus from '../../../../components/Admin/Menus/Index';

describe('Admin: Menu Component', () => {
  const wrapper = shallow(<Menus />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
