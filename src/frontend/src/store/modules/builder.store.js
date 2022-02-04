import data from "@/static/pizza.json";
import { getDough, getSizes, getSauces, getFilling } from "@/common/helpers.js";

const setupState = () => ({
  dough: getDough(data.dough),
  sizes: getSizes(data.sizes),
  sauces: getSauces(data.sauces),
  ingredients: getFilling(data.ingredients),
  selectedDough: {},
  selectedSauce: {},
  selectedSize: {},
  selectedIngredients: {},
  pizzaName: "",
  pizzaPrice: 0,
});

const state = setupState();

const mutations = {
  SELECT_DOUGH: (state, selectedDough) => {
    state.selectedDough = selectedDough;
  },

  SELECT_SIZE: (state, selectedSize) => {
    state.selectedSize = selectedSize;
  },

  SELECT_SAUCE: (state, selectedSauce) => {
    state.selectedSauce = selectedSauce;
  },

  SET_PIZZA_NAME: (state, pizzaName) => {
    state.pizzaName = pizzaName;
  },

  UPDATE_INGREDIENTS: (state, ingredientSet) => {
    state.selectedIngredients = {
      ...state.selectedIngredients,
      [ingredientSet.name]: ingredientSet.amount,
    };
  },

  SET_INGREDIENTS: (state, newIngredientsSet) => {
    state.selectedIngredients = newIngredientsSet;
  },

  SET_PIZZA_PRICE: (state, price) => {
    state.pizzaPrice = price;
  },

  RESET_STATE: (state) => {
    Object.assign(state, setupState());
  },
};

const actions = {
  async selectDough({ commit, dispatch }, selectedDough) {
    const price = await dispatch("countPizzaPrice");

    commit("SELECT_DOUGH", selectedDough);
    commit("SET_PIZZA_PRICE", price);
  },

  async selectSize({ commit, dispatch }, selectedSize) {
    const price = await dispatch("countPizzaPrice");

    commit("SELECT_SIZE", selectedSize);
    commit("SET_PIZZA_PRICE", price);
  },

  async selectSauce({ commit, dispatch }, selectedSauce) {
    const price = await dispatch("countPizzaPrice");

    commit("SELECT_SAUCE", selectedSauce);
    commit("SET_PIZZA_PRICE", price);
  },

  async updateIngredients({ commit, dispatch }, ingredientSet) {
    const price = await dispatch("countPizzaPrice");

    commit("UPDATE_INGREDIENTS", ingredientSet);
    commit("SET_PIZZA_PRICE", price);
  },

  async setIngredients({ commit, dispatch }, ingredientSet) {
    const price = await dispatch("countPizzaPrice");

    commit("SET_INGREDIENTS", ingredientSet);
    commit("SET_PIZZA_PRICE", price);
  },

  async countPizzaPrice({ getters }) {
    return await getters.getPizzaPrice;
  },

  resetBuilder({ commit }) {
    commit("RESET_STATE");
  },
};

const getters = {
  getDough: (state) => state.dough,
  getSizes: (state) => state.sizes,
  getSauces: (state) => state.sauces,
  getIngredients: (state) => state.ingredients,
  getSelectedDough: (state) => state.selectedDough,
  getSelectedSize: (state) => state.selectedSize,
  getSelectedSauce: (state) => state.selectedSauce,
  getPizzaName: (state) => state.pizzaName,
  getDoughPrice: (state) => state.selectedDough.price || 0,
  getSizePrice: (state) => state.selectedSize.multiplier || 0,
  getSaucePrice: (state) => state.selectedSauce.price || 0,
  getSelectedIngredients: (state) => state.selectedIngredients,
  getIngredientsPrice: (state) => {
    return Object.entries(state.selectedIngredients).reduce((result, item) => {
      const price =
        state.ingredients.find((ingredient) => ingredient.filling === item[0])
          .price * item[1];
      return (result += price);
    }, 0);
  },
  getPizzaPrice: (state, getters) => {
    return (
      (getters.getDoughPrice +
        getters.getSaucePrice +
        getters.getIngredientsPrice) *
      (getters.getSizePrice || 1)
    );
  },
  getCurrentPizza: (state, getters) => ({
    id: `${state.pizzaName}-${getters.getPizzaPrice}`,
    name: state.pizzaName,
    price: getters.getPizzaPrice,
    dough: state.selectedDough,
    sauce: state.selectedSauce,
    ingredients: state.selectedIngredients,
    size: state.selectedSize,
    amount: 1,
  }),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
