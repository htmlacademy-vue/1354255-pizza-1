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
