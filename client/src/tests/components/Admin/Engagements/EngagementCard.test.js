/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { EngagementCard } from '../../../../components/Admin/Engagements/EngagementCard';
import engagements from '../../../__mocks__/mockEngagements';

jest.mock('../../../../helpers/dateFormatter.js');

const setup = () => {
  const props = {
    engagement: engagements[0]
  };

  return mount(<EngagementCard {...props} />);
};

const wrapper = setup();

describe('EngagementCard Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
