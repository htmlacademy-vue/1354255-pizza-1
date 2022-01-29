import data from "@/static/pizza.json";
import { getDough, getSizes, getSauces } from "@/common/helpers.js";

const state = () => ({
  dough: getDough(data.dough),
  selectedDough: {},
  sizes: getSizes(data.sizes),
  selectedSize: {},
  sauces: getSauces(data.sauces),
  selectedSauce: {},
  pizzaName: "",
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
};

const actions = {};

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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
