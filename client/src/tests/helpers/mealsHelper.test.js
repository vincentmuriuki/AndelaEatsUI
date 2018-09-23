import {
  validateDate,
  endDate,
  canOrderMeal,
  generateFormData
} from "../../helpers/mealsHelper";

/* 
global jest 
expect 
*/
const menu = { date: new Date('2/5/2018') };
const today = new Date();
const mealDetails = {
  name: 'Ugeli',
  type: 'Side',
  image: { 
    file: new File([''], 'filename.jpg', { type: 'image/jpg' })
  },
  desc: 'Description for meals'
};

const types = ['Side', 'Main', 'Soup', 'Protein'];

test('validateDate method', () => {
  expect(validateDate(menu, endDate())).toBe(false);
});

test('canOrderMeal method', () => {
  expect(canOrderMeal(menu.date)).toBe(false);

  const newDate = {
    date: new Date(today.getFullYear(),
      today.getMonth(), today.getDate() + 4)
  };
  const timLeft = (newDate - today) / 3600 / 1000;
  expect(canOrderMeal(newDate)).toBe(true);
});

test('returns an object of meal details', () => {
  const newMealDetails = { ...mealDetails };
  const result = generateFormData(newMealDetails, types);
  
  expect(result.mealName).toBe(mealDetails.name);
  expect(result.mealType).toBe(mealDetails.type.toLowerCase());
  expect(result.description).toBe(mealDetails.desc);
});

test('returns array of image string error', () => {
  const newMealDetails = { ...mealDetails, image: { file: null } };
  const result = generateFormData(newMealDetails, types);
  expect(result).toEqual(['image']);
});

test('returns array of name string error', () => {
  const newMealDetails = { ...mealDetails, name: '' };
  const result = generateFormData(newMealDetails, types);
  expect(result).toEqual(['name']);
});

test('returns array of desc string error', () => {
  const newMealDetails = { ...mealDetails, desc: '' };
  const result = generateFormData(newMealDetails, types);
  expect(result).toEqual(['desc']);
});

test('returns array of type string error', () => {
  const newMealDetails = { ...mealDetails, type: '' };
  const result = generateFormData(newMealDetails, types);
  expect(result).toEqual(['type']);
});