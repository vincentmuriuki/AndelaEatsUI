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

export const validateDate = (menu, endDate) => {
  return new Date(menu.date) <= endDate
  && new Date(menu.date) >= today;
};

export const endDate = () => new Date(today.getFullYear(), 
  today.getMonth(), today.getDate() + 7);
