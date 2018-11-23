export default (date) => {
  const splitDate = new Date(date).toDateString().split(" ");
  return `${splitDate[2]} ${splitDate[1]} ${splitDate[3]}`;
};

export const formatDateToISOString = date => {
  return new Date(date).toISOString().split('T')[0];
}