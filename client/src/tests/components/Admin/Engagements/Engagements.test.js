/* eslint-disable semi */
import React from 'react';
import { mount } from 'enzyme';
import Engagemnets from '../../../../components/Admin/Engagements/Index';


const wrapper = mount(<Engagemnets />);

describe('Engagements Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
});