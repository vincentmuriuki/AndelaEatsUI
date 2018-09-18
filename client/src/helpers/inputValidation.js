const inputValidation = (formFields) => {
  const errors = {};
  Object.entries(formFields).forEach(([key, value]) => {
    if (value.toString().trim() === "" 
      && key !== 'errors' && key !== 'id') {
      errors[key] = '*required';
    }
  });

  return {
    isEmpty: Object.keys(errors).length === 0 ? true : false,
    errors 
  };
};

export default inputValidation;
