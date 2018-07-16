export default (day) => {
  const todaysDate = new Date();
  const dueTime = 24 - 15;
  const tomorrowsDate = new Date(day.date);
  const timeLeft = Math.floor((tomorrowsDate - todaysDate) / 3600 / 1000);

  if (dueTime < timeLeft && timeLeft < 120) {
    return true;
  } 
  return false;
};
