import data from "@/static/pizza.json";
import { getDough, getSizes, getSauces, getFilling } from "@/common/helpers.js";

const state = () => ({
  dough: getDough(data.dough),
  selectedDough: {},
  sizes: getSizes(data.sizes),
  selectedSize: {},
  sauces: getSauces(data.sauces),
  selectedSauce: {},
  pizzaName: "",
  ingredients: getFilling(data.ingredients),
  selectedIngredients: {},
});

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

  ADD_INGREDIENTS: (state, ingredientSet) => {
    state.selectedIngredients = {
      ...state.selectedIngredients,
      [ingredientSet.name]: ingredientSet.amount,
    };
  },
};

const getters = {
  getDough: (state) => state.dough,
  getSelectedDough: (state) => state.selectedDough,
  getSizes: (state) => state.sizes,
  getSelectedSize: (state) => state.selectedSize,
  getSauces: (state) => state.sauces,
  getSelectedSauce: (state) => state.selectedSauce,
  getPizzaName: (state) => state.pizzaName,
  getDoughPrice: (state) => state.selectedDough.price || 0,
  getSizePrice: (state) => state.selectedSize.multiplier || 0,
  getSaucePrice: (state) => state.selectedSauce.price || 0,
  getIngredients: (state) => state.ingredients,
  getSelectedIngredients: (state) => state.selectedIngredients,
  getIngredientsPrice: (state) => {
    return Object.entries(state.selectedIngredients).reduce((result, item) => {
      const price =
        state.ingredients.find((ingredient) => ingredient.filling === item[0])
          .price * item[1];
      return (result += price);
    }, 0);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
