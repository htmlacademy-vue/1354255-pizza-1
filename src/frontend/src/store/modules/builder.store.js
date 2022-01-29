import data from "@/static/pizza.json";
import { getDough } from "@/common/helpers.js";

const state = () => ({
  dough: getDough(data.dough) || [],
  selectedDough: {},
});

const mutations = {
  SELECT_DOUGH: (state, selectedDough) => {
    state.selectedDough = selectedDough;
  },
};

const actions = {};

const getters = {
  getDough: (state) => state.dough,
  getSelectedDough: (state) => state.selectedDough,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
