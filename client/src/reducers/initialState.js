export default {
  isLoading: false,
  activeUser: {},
  menus: []
};

export const initialMenus = {
  menus: [],
  isLoading: false,
  acc1: '',
  acc2: '',
  mainMeal: '',
  message: ''
};

export const orders = {
  isLoading: false,
  error: "",
  totalRecords: 0,
  currentPage: 1,
  meals: [],
  isFiltered: false,
  menu: {
    meal: {
      main: [],
      firstAccompaniment: [],
      secondAccompaniment: []
    }
  }
};

export const initialVendors = {
  isLoading: false,
  vendors: [],
};

export const mealOrders = {
  isLoading: false,
  orders: []
};
