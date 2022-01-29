import data from "@/static/pizza.json";
import { getDough, getSizes } from "@/common/helpers.js";

const state = () => ({
  dough: getDough(data.dough) || [],
  selectedDough: {},
  sizes: getSizes(data.sizes),
  selectedSize: {},
});

const mutations = {
  SELECT_DOUGH: (state, selectedDough) => {
    state.selectedDough = selectedDough;
  },

  SELECT_SIZE: (state, selectedSize) => {
    state.selectedSize = selectedSize;
  },
};

const actions = {};

const getters = {
  getDough: (state) => state.dough,
  getSelectedDough: (state) => state.selectedDough,
  getSizes: (state) => state.sizes,
  getSelectedSize: (state) => state.selectedSize,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
