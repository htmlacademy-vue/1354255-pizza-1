import data from "@/static/pizza.json";
import { getDough, getSizes, getSauces } from "@/common/helpers.js";

const state = () => ({
  dough: getDough(data.dough),
  selectedDough: {},
  sizes: getSizes(data.sizes),
  selectedSize: {},
  sauces: getSauces(data.sauces),
  selectedSauce: {},
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
};

const actions = {};

const getters = {
  getDough: (state) => state.dough,
  getSelectedDough: (state) => state.selectedDough,
  getSizes: (state) => state.sizes,
  getSelectedSize: (state) => state.selectedSize,
  getSauces: (state) => state.sauces,
  getSelectedSauce: (state) => state.selectedSauce,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
