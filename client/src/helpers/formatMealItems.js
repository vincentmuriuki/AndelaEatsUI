const formatMealItems = (mealItems = []) => {
  const Output = { main: [], protein: [], side: [] };

  mealItems.map(mealItem => {
    if (mealItem.mealType === 'main') {
      Output.main.push({ value: mealItem.id, label: mealItem.name });
    } else if (mealItem.mealType === 'protein') {
      Output.protein.push({ value: mealItem.id, label: mealItem.name });
    } else if (mealItem.mealType === 'side') {
      Output.side.push({ value: mealItem.id, label: mealItem.name });
    }
  });

  return Output;
};

export const getIds = (mealItem) => {
  const ids = mealItem.map(id => id.value);

  return ids;
};

export const formatDate = (date) => (
  date.format("YYYY-MM-DD")
);

export const formatSingleSelection = (value) => ({
  value,
  label: value
});

export const formatMealitem = (mealItem) => ({
  value: mealItem.id,
  label: mealItem.name
});

export const formatMutipleSelection = (array) => {
  const output = array.map(item => ({ value: item.id, label: item.name }));
  
  return output;
};

export const formatEngagement = (engagements, vendorId) => {
  const engagement = engagements
    .filter(engagement => engagement.vendorId === vendorId)
    .map(engagement => ({
        value: engagement.vendorId,
        label: `${engagement.vendor.name} - ${engagement.startDate.slice(5, 17)} to ${engagement.endDate.slice(5, 17)}`
    }))

  return engagement;
};

export default formatMealItems;
