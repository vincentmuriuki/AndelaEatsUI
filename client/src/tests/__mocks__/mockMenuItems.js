export const menuItemsUI = [
  {
    id: 2,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
  {
    id: 3,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
  {
    id: 4,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
  {
    id: 5,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
  {
    id: 6,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
  {
    id: 7,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
  {
    id: 9,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
];

export const mockMenuItem = [
  { value: "White rice", label: "White rice" },
  { value: "Ofada rice", label: "Ofada rice" },
  { value: "Beans", label: "Beans" },
  { value: "Eba (garri)", label: "Eba (garri)" },
  { value: "Amala", label: "Amala" }
];

export const secondaryItem = [
  { value: "Stew", label: "Stew" },
  { value: "Ofada sauce", label: "Ofada sauce" },
  { value: "Egusi", label: "Egusi" },
  { value: "Ewedu", label: "Ewedu" },
  { value: "Plantain", label: "Plantain" },
  { value: "Salad", label: "Salad" },
  { value: "Moi-Moi", label: "Moi-Moi" }
];

export const mockProtein = [
  { value: "Fish", label: "Fish" },
  { value: "Meat", label: "Meat" },
  { value: "Chicken", label: "Chicken" }
];

export const adminAllowed = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 }
];

export const engagements = [
  {
    endDate: "Sun, 11 Nov 2018 00:00:00 GMT",
    id: 1,
    isDeleted: false,
    startDate: "Wed, 10 Oct 2018 00:00:00 GMT",
    status: 1,
    terminationReason: null,
    timestamps: {
      created_at: "Tue, 09 Oct 2018 16:34:40 GMT",
      date_pretty: "October 09, 2018",
      date_pretty_short: "Oct 09, 2018",
      updated_at: "Tue, 09 Oct 2018 16:34:40 GMT"
    },
    vendor: {
      address: "Ketu, Lagos",
      contactPerson: "Yemi",
      id: 1,
      isDeleted: false,
      name: "Spicy Chops",
      tel: "12345678900",
      timestamps: {
        created_at: "Tue, 09 Oct 2018 16:34:40 GMT",
        date_pretty: "October 09, 2018",
        date_pretty_short: "Oct 09, 2018",
        updated_at: "Tue, 09 Oct 2018 16:34:40 GMT"
      }
    },
    vendorId: 1
  }
];

export const menu = {
  date: "2018-10-22", 
  mealPeriod: "Lunch",
  id: 1,
  mainMealId: 1,
  allowedSide: 2, 
  allowedProtein: 1,
  sideItems: [1],
  proteinItems: [1, 2]
};

export const menuItem = {
  allowedProtein: 1,
  allowedSide: 1,
  date: "Wed, 07 Nov 2018 00:00:00 GMT",
  id: 21,
  isDeleted: false,
  mainMeal: {
    description: "Orion food for chibueze",
    id: 55,
    image: "https://res.cloudinary.com/dunnio1id/image/upload/v1540381196/gpuo1eipbzivzx89wem3.jpg",
    isDeleted: false,
    mealType: "main",
    name: "Orion"
  },
  proteinItems: [{
    description: "Fried meat",
    id: 51,
    image: "https://res.cloudinary.com/dunnio1id/image/upload/v1540877218/pqpbl7wdlphwqxlzp1wy.png",
    isDeleted: false,
    mealType: "protein",
    name: "Meat"
  }],
  sideItems: [{
    description: "Beans",
    id: 41,
    image: "image.jpg",
    isDeleted: true,
    mealType: "side",
    name: "Beans230"
  }],
  vendorEngagementId: 1
};

export default {
  menuItemsUI
};
