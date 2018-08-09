import { validateDate, endDate, canOrderMeal } from "../../helpers/mealsHelper";

/* 
global jest 
expect 
*/
const menu = { date: new Date('2/5/2018') };
const today = new Date();

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