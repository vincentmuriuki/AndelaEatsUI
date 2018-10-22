const formatMealItems = (mealItems = []) => {
  const Output = { main: [], protein: [], side: [] };

  mealItems.map(mealItem => {
    if (mealItem.mealType === 'main') {
      Output.main.push({value: mealItem.id, label: mealItem.name })
    }
    else if (mealItem.mealType === 'protein') {
      Output.protein.push({value: mealItem.id, label: mealItem.name })
    }
    else if (mealItem.mealType === 'side') {
      Output.side.push({value: mealItem.id, label: mealItem.name })
    }
  });

  return Output;
}

export const getIds = (mealItem) => {
  const ids = [];
  mealItem.map(id => {
    ids.push(id.value)
  });

  return ids;
};

export default formatMealItems;
