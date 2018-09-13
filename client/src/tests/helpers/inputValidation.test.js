import inputValidation from "../../helpers/inputValidation";

const FormField = {
  lastName: "Chibueze",
  firstName: "Ayogu",
  errors: {}
};

test('Validate form field', () => {
  expect(inputValidation(FormField)).toEqual({ isEmpty: true, errors: { } });
});
