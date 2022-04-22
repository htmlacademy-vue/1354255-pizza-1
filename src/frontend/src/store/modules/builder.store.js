import { generateId } from "@/common/helpers.js";

const setupState = () => ({
  dough: [],
  sizes: [],
  sauces: [],
  ingredients: [],
  selectedDough: {
    type: "large",
    price: 300,
    name: "Толстое",
    id: 2,
  },
  selectedSauce: {
    type: "tomato",
    price: 50,
    name: "Томатный",
    id: 2,
  },
  selectedSize: {
    type: "big",
    multiplier: 3,
    name: "45 см",
    id: 3,
  },
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

  SET_DOUGH_LIST: (state, dough) => {
    state.dough = dough;
  },

  SET_SIZE_LIST: (state, sizes) => {
    state.sizes = sizes;
  },

  SET_SAUCE_LIST: (state, sauces) => {
    state.sauces = sauces;
  },

  SET_INGREDIENT_LIST: (state, ingredients) => {
    state.ingredients = ingredients;
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

  async loadAllPizzaStuff({ commit }) {
    try {
      const [doughList, sauceList, sizeList, ingredientList] =
        await Promise.all([
          this.$api.dough.query(),
          this.$api.sauce.query(),
          this.$api.size.query(),
          this.$api.ingredients.query(),
        ]);

      commit("SET_DOUGH_LIST", doughList);
      commit("SET_SAUCE_LIST", sauceList);
      commit("SET_SIZE_LIST", sizeList);
      commit("SET_INGREDIENT_LIST", ingredientList);
    } catch (error) {
      console.log(error);
    }
  },
};

const getters = {
  getSelectedIngredients: (state) =>
    state.selectedIngredients.reduce((obj, item) => {
      return (
        obj[item.filling] ? obj[item.filling]++ : (obj[item.filling] = 1), obj
      );
    }, {}),
  getDoughPrice: (state) => state.selectedDough.price || 0,
  getSizePrice: (state) => state.selectedSize.multiplier || 0,
  getSaucePrice: (state) => state.selectedSauce.price || 0,
  getIngredientsPrice: (state) => {
    return state.selectedIngredients.reduce((result, item) => {
      return (result += item.price);
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
