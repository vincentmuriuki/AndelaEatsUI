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
  message: '',
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
  isCreating: false,
  isDeleting: false,
  isUpdating: false,
  vendors: [],
};

export const mealOrders = {
  isLoading: false,
  orders: []
};

export const initialMealItems = {
  isLoading: false,
  isDeleting: false,
  meals: [],
  pagination: null,

  mealModal: {
    show: false,
    edit: false,
    addBtnDisabled: false,
    errors: [],
    isLoading: false
  }
};

export const initialAdminMenus = {
  isLoading: false,
  isDeleting: false,
  isCreating: false,

  dateOfMeal: null,
  mealPeriod: null,
  menuList: [],
  vendorEngagements: [],
  mealItems: [],

  meta: null,
  error: {
    status: false,
    message: null
  }
};
