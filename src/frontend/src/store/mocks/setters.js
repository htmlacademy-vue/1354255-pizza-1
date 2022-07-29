import pizzaData from "@/static/pizza.json";
import miscData from "@/static/misc.json";
import user from "@/static/user.json";

const testDough = {
  id: 1,
  name: "Тонкое",
  image: "/public/img/dough-light.svg",
  description: "Из твердых сортов пшеницы",
  price: 300,
};

const testSauce = {
  id: 1,
  name: "Томатный",
  price: 50,
};

const testSize = {
  id: 1,
  name: "23 см",
  image: "/public/img/diameter.svg",
  multiplier: 1,
};

const testIngredients = [
  {
    id: 1,
    name: "Грибы",
    image: "/public/img/filling/mushrooms.svg",
    price: 33,
  },
];

export const testPizza = {
  id: "testpizza-1234",
  name: "test pizza",
  price: 383,
  dough: testDough,
  sauce: testSauce,
  ingredients: testIngredients,
  size: testSize,
  amount: 1,
};

export const testAddress = {
  id: 1,
  name: "Домашний",
  street: "Ленина",
  building: "41",
  flat: "11",
};

const testMisc = {
  miscId: 1,
  quantity: 1,
  name: "Cola-Cola 0,5 литра",
  image: "/public/img/cola.svg",
  price: 56,
};

const testOrders = [
  {
    id: 1,
    orderPizzas: [
      {
        id: 2,
        name: "test pizza",
        sizeId: testSize.id,
        doughId: testDough.id,
        sauceId: testSauce.id,
        ingredients: testIngredients,
      },
    ],
    orderMisc: [testMisc],
    orderAddress: testAddress,
  },
];

export const setPizza = (store) => {
  store.commit("Cart/ADD_PIZZA", testPizza);
};

export const setMiscData = (store) => {
  store.commit("Common/SET_MISC_DATA", miscData);
};

export const setDoughData = (store) => {
  store.commit("Common/SET_DOUGH_DATA", pizzaData.dough);
};

export const setSaucesData = (store) => {
  store.commit("Common/SET_SAUCES_DATA", pizzaData.sauces);
};

export const setSizesData = (store) => {
  store.commit("Common/SET_SIZES_DATA", pizzaData.sizes);
};

export const setIngredientsData = (store) => {
  store.commit("Common/SET_INGREDIENTS_DATA", pizzaData.ingredients);
};

export const selectDough = (store) => {
  store.commit("Builder/SELECT_DOUGH", pizzaData.dough[0]);
};

export const selectSize = (store) => {
  store.commit("Builder/SELECT_SIZE", pizzaData.sizes[0]);
};

export const selectSauce = (store) => {
  store.commit("Builder/SELECT_SAUCE", pizzaData.sauces[0]);
};

export const setUser = (store) => {
  store.commit("Auth/SET_USER", user);
};

export const setOrders = (store) => {
  store.commit("Orders/SET_ORDERS", testOrders);
};

export const setPizzaName = (store) => {
  store.commit("Builder/SET_PIZZA_NAME", testPizza.name);
}
