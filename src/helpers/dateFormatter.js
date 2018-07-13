export default (date) => {
  const splitDate = new Date(date).toDateString().split(" ");
  return `${splitDate[2]} ${splitDate[1]} ${splitDate[3]}`;
};
