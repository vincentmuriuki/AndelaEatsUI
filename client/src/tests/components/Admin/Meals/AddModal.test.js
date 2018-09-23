/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import AddMealModal from '../../../../components/Admin/Meals/AddMealModal/Index'; /* eslint-disable-line */

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('AddMealModal Component', () => {
  const store = mockStore({
    mealItems: {
      isLoading: false,
      meals: [],
    
      addMealModal: {
        show: false,
        addBtnDisabled: false,
        errors: ['name'],
        isLoading: false
      }
    }
  });

  const props = {
    show: true,
    toggleAddModal: jest.fn()
  };

  const imageFile = new File(
    [''], 'filename.jpg',
    { type: 'image/jpeg' }
  );

  const mealObject = {
    name: 'Ugeli',
    desc: 'Nice Meal',
    type: 'Side',
    image: {
      file: imageFile
    }
  };

  const wrapper = mount(
    <BrowserRouter>
      <AddMealModal store={store} {...props} />
    </BrowserRouter>
  );

  const addMealModalWrap = wrapper.find('AddMealModal');
  const addMealModal = addMealModalWrap.instance();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call the onChange method', () => {
    const name = 'Ugeli';
    const desc = 'Meal Description';

    const event = {
      target: {
        name: 'name',
        value: name
      }
    };
    
    wrapper.find('[name="name"]').simulate('change', event);
    expect(addMealModal.state.name).toBe(name);

    event.target.name = 'desc';
    event.target.value = desc;    
    wrapper.find('[name="desc"]').simulate('change', event);
    expect(addMealModal.state.desc).toBe(desc);
  });

  it('call previewImage with invalid image', () => {
    addMealModal.imageInput = {
      current: {
        files: [
          new File([''], 'filename.jpg', { type: "image/gif" })
        ]
      }
    };

    addMealModal.previewImage();
    expect(addMealModal.state.image.dataurl).toBe(null);
  });

  it('should call previewImage with valid image', () => {
    global.FileReader = class MockFileReader {
      constructor() {
        this.result = "data:url/to/image";

        this.readAsDataURL = () => {
          this.onload();
        };
      }
    };
    addMealModal.imageInput = {
      current: {
        files: [imageFile]
      }
    };

    addMealModal.previewImage();
    expect(addMealModal.state.image.dataurl).toBe('data:url/to/image');
  });

  it('should call openFileDialog', () => {
    addMealModal.imageInput = {
      current: {
        click: jest.fn()
      }
    };

    const spy = jest.spyOn(addMealModal.imageInput.current, 'click');
    addMealModal.openFileDialog();
    expect(spy).toHaveBeenCalled();
  });

  it('should submit form with invalid details', () => {
    const form = wrapper.find('#add-meal-form');
    addMealModal.state = mealObject;
    addMealModal.state.name = '';
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(addMealModal.props.errors.includes('name')).toBe(true);
  });

  it('should submit form with valid details', () => {
    const form = wrapper.find('#add-meal-form');
    addMealModal.state.name = 'Ugeli';
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(addMealModal.state.name).toBe('Ugeli');
  });

  it('should call closeModal', () => {
    addMealModal.closeModal();
    expect(addMealModal.state.name).toBe('');
    expect(addMealModal.state.type).toBe('');
    expect(addMealModal.state.desc).toBe('');
  });
});
