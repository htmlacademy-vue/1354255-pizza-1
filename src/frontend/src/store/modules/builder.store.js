import data from "@/static/pizza.json";
import { getDough, getSizes, getSauces, getFilling } from "@/common/helpers.js";

const state = () => ({
  dough: getDough(data.dough),
  sizes: getSizes(data.sizes),
  sauces: getSauces(data.sauces),
  ingredients: getFilling(data.ingredients),
  currentPizza: {
    name: "",
    dough: {},
    size: {},
    sauce: {},
    ingredients: {},
    price: 0,
  },
});

const mutations = {
  SELECT_DOUGH: (state, selectedDough) => {
    state.currentPizza = { ...state.currentPizza, dough: selectedDough };
  },

  SELECT_SIZE: (state, selectedSize) => {
    state.currentPizza = { ...state.currentPizza, size: selectedSize };
  },

  SELECT_SAUCE: (state, selectedSauce) => {
    state.currentPizza = { ...state.currentPizza, sauce: selectedSauce };
  },

  SET_PIZZA_NAME: (state, pizzaName) => {
    state.currentPizza = { ...state.currentPizza, name: pizzaName };
  },

  ADD_INGREDIENTS: (state, ingredientSet) => {
    state.currentPizza = {
      ...state.currentPizza,
      ingredients: {
        ...state.currentPizza.ingredients,
        [ingredientSet.name]: ingredientSet.amount,
      },
    };
  },

  SET_PIZZA_PRICE: (state, price) => {
    state.currentPizza.price = { ...state.currentPizza, price };
  },
};

const actions = {
  selectDough({ commit, dispatch }, selectedDough) {
    const price = dispatch("countPizzaPrice");

    commit("SELECT_DOUGH", selectedDough);
    commit("SET_PIZZA_PRICE", price);
  },

  selectSize({ commit, dispatch }, selectedSize) {
    const price = dispatch("countPizzaPrice");

    commit("SELECT_SIZE", selectedSize);
    commit("SET_PIZZA_PRICE", price);
  },

  selectSauce({ commit, dispatch }, selectedSauce) {
    const price = dispatch("countPizzaPrice");

    commit("SELECT_SAUCE", selectedSauce);
    commit("SET_PIZZA_PRICE", price);
  },

  addIngredients({ commit, getters }, ingredientSet) {
    commit("ADD_INGREDIENTS", ingredientSet);
    commit("SET_PIZZA_PRICE", getters.getIngredientsPrice);
  },

  countPizzaPrice({ getters }) {
    return getters.getPizzaPrice;
  },
};

const getters = {
  getDough: (state) => state.dough,
  getSizes: (state) => state.sizes,
  getSauces: (state) => state.sauces,
  getIngredients: (state) => state.ingredients,
  getSelectedDough: (state) => state.currentPizza.dough,
  getSelectedSize: (state) => state.currentPizza.size,
  getSelectedSauce: (state) => state.currentPizza.sauce,
  getPizzaName: (state) => state.currentPizza.name,
  getDoughPrice: (state) => state.currentPizza.dough.price || 0,
  getSizePrice: (state) => state.currentPizza.size.multiplier || 0,
  getSaucePrice: (state) => state.currentPizza.sauce.price || 0,
  getSelectedIngredients: (state) => state.currentPizza.ingredients,
  getIngredientsPrice: (state) => {
    return Object.entries(state.currentPizza.ingredients).reduce(
      (result, item) => {
        const price =
          state.ingredients.find((ingredient) => ingredient.filling === item[0])
            .price * item[1];
        return (result += price);
      },
      0
    );
  },
  getPizzaPrice: (state, getters) => {
    return (
      (getters.getDoughPrice +
        getters.getSaucePrice +
        getters.getIngredientsPrice) *
      (getters.getSizePrice || 1)
    );
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
