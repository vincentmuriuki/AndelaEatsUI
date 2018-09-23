import { title } from './index';

export const canOrderMeal = (day) => {
  const todaysDate = new Date();
  const dueTime = 24 - 15;
  const tomorrowsDate = new Date(day.date);
  const timeLeft = Math.floor((tomorrowsDate - todaysDate) / 3600 / 1000);

  if (dueTime < timeLeft && timeLeft < 144) {
    return true;
  } 
  return false;
};

const today = new Date();
today.setHours(0, 0, 0, 0);

export const validateDate = (menu, endDate) => (
  new Date(menu.date) <= endDate
  && new Date(menu.date) >= today
);

export const validateAddMealImage = (image) => {
  const exts = [
    'image/jpg',
    'image/jpeg',
    'image/png'
  ];

  if (!(image instanceof File) || !exts.includes(image.type)) {
    return 'Image should be in JPEG or PNG format';
  }

  return true;
};

export const generateFormData = (mealDetails, types) => {
  const {
    name, desc, type, image: { file }
  } = mealDetails;
  
  const errors = [];
  if (!(file instanceof File)) {
    errors.push('image');
  }
  if (name.trim().length <= 0) {
    errors.push('name');
  }
  if (!types.includes(type)) {
    errors.push('type');
  }
  if (desc.trim().length <= 0) {
    errors.push('desc');
  }
  return (
    errors.length !== 0
      ? errors : {
        mealName: title(name),
        mealType: type.toLowerCase(),
        description: title(desc),
        image: file
      }
  );
};

export const endDate = () => new Date(today.getFullYear(), 
  today.getMonth(), today.getDate() + 7);
