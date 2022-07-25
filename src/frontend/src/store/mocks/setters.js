import pizzaData from "@/static/pizza.json";
import miscData from "@/static/misc.json";
import user from "@/static/user.json";

const testPizza = {
  id: "testpizza-1234",
  name: "test pizza",
  price: 383,
  dough: {
    id: 1,
    name: "Тонкое",
    image: "/public/img/dough-light.svg",
    description: "Из твердых сортов пшеницы",
    price: 300,
  },
  sauce: {
    id: 1,
    name: "Томатный",
    price: 50,
  },
  ingredients: [
    {
      id: 1,
      name: "Грибы",
      image: "/public/img/filling/mushrooms.svg",
      price: 33,
    },
  ],
  size: {
    id: 1,
    name: "23 см",
    image: "/public/img/diameter.svg",
    multiplier: 1,
  },
  amount: 1,
};

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
