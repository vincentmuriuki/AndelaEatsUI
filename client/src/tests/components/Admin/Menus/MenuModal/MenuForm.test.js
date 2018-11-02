/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import MenuForm from '../../../../../components/Admin/Menus/MenuModal/MenuForm';
import { mockMenuItem } from '../../../../__mocks__/mockMenuItems';

describe('MenuForm Component', () => {
  const setup = () => {
    const props = {
      modalTitle: '',
      modalButtontext: '',
      displayModal: true,
      isCreating: false,
      isUpdating: false,
      sideMeal: [],
      mainItem: [],
      protein: [],
      vendorEngagementId: [],
      allowedSide: [],
      allowedProtein: [],
      collectionDate: {},
      formatedMealItems: {},
      engagements: [],
      errors: {},
      handleCloseModal: jest.fn(),
      formValidation: jest.fn(),
      onChange: jest.fn(),
      handleSubmit: jest.fn(),
      vendorEngagements: [
        {
          vendorId: '',
          vendor: { name: '' },
          startDate: '',
          endDate: ''
        }
      ],
      mealItems: [
        {
          description: "Jollof Rice",
          id: 1,
          image: "google.com",
          isDeleted: false,
          mealType: "main",
          name: "Rice"
        },
        {
          description: "Fried Chicken",
          id: 3,
          image: "google.com",
          isDeleted: false,
          mealType: "protein",
          name: "Chicken",
        },
        {
          description: "Baked beans",
          id: 4,
          image: "google.com",
          isDeleted: false,
          mealType: "side",
          name: "Moi Moi",
        }
      ]
    };

    return shallow(<MenuForm {...props} />);
  };

  const wrapper = setup();
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulate cancel button click', () => {
    wrapper.find('StateManager').at(0).simulate('onChage');
  });

  // it('should simulate add/update button click', () => {
  // const spy = jest.spyOn(wrapper.instance(), 'formValidation');
  // wrapper.find('button[type="submit"]').toHaveLength(1);
  // expect(spy).toHaveBeenCalled();
  // });
});
