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

const validateFileUpload = (file, dataurl) => {
  const errors = [];
  if (!file && !dataurl) { errors.push('image'); }
  if (file && !(file instanceof File)) { errors.push('image'); }

  return errors;
};

const validateInputFields = (mealDetails) => {
  const errors = [];

  Object.entries(mealDetails).forEach(([key, value]) => {
    if (key === 'image' || key === 'type') return false;
    if (!value.toString().trim().length) { errors.push(key); }
  });

  return errors;
};

export const generateFormData = (mealDetails, types) => {
  const {
    name, desc, type, image: { file, dataurl }
  } = mealDetails;
  
  let errors = [];

  errors = [
    ...errors,
    ...validateInputFields(mealDetails),
    ...validateFileUpload(file, dataurl)
  ];
  
  if (!types.includes(type)) { errors.push('type'); }
  if (errors.length) return errors;

  return {
    mealName: title(name),
    mealType: type.toLowerCase(),
    description: title(desc),
    image: file || dataurl
  };
};

export const endDate = () => new Date(today.getFullYear(), 
  today.getMonth(), today.getDate() + 7);

export const findUpdatedIndex = (prevState, updatedId) => (
  prevState.findIndex(item => item.id === updatedId)
);
