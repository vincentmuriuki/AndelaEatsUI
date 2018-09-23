/**
 * 
 * 
 * @description capitalize string first letter
 * 
 * @param { String } argument
 * 
 * @returns { String } 
 */
export const title = argument => {
  const string = argument.toLowerCase();
  return (
    string[0].toUpperCase()
    + string.substr(1)
  );
};
