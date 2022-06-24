import { generateId } from "@/common/helpers.js";

const setupState = () => ({
  selectedDough: {},
  selectedSauce: {},
  selectedSize: {},
  selectedIngredients: [],
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

  SELECT_INGREDIENTS: (state, ingredient) => {
    state.selectedIngredients.push(ingredient);
  },

  REMOVE_INGREDIENT: (state, ingredientName) => {
    const firstIngredientIndex = state.selectedIngredients.findIndex(
      (item) => item.filling === ingredientName
    );
    state.selectedIngredients.splice(firstIngredientIndex, 1);
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

  async selectIngredients({ commit, dispatch }, ingredient) {
    const price = await dispatch("countPizzaPrice");

    commit("SELECT_INGREDIENTS", ingredient);
    commit("SET_PIZZA_PRICE", price);
  },

  async removeIngredient({ commit, dispatch }, ingredientName) {
    const price = await dispatch("countPizzaPrice");

    commit("REMOVE_INGREDIENT", ingredientName);
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
  getSelectedIngredients: (state) =>
    state.selectedIngredients.reduce((obj, item) => {
      return {
        ...obj,
        [item.filling]: obj[item.filling] ? obj[item.filling] + 1 : 1,
      };
    }, {}),
  getDoughPrice: (state) => state.selectedDough.price || 0,
  getSizePrice: (state) => state.selectedSize.multiplier || 0,
  getSaucePrice: (state) => state.selectedSauce.price || 0,
  getIngredientsPrice: (state) => {
    return state.selectedIngredients.reduce((result, item) => {
      return result + item.price;
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
    id: `${state.pizzaName}-${generateId()}`,
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
