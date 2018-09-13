/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import { shallow } from 'enzyme';
import AddMealModal from '../../../../components/Admin/Meals/AddMealModal';

describe('AddMealModal Component', () => {
  const wrapper = shallow(<AddMealModal show />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
