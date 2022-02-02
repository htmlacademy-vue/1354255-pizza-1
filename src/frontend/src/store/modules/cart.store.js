import data from "@/static/misc.json";
import { getAdditionalItems } from "@/common/helpers.js";

const state = () => ({
  pizzaPrice: 0,
  additionals: getAdditionalItems(data),
});

const mutations = {
  SET_PIZZA_PRICE: (state, price) => {
    state.pizzaPrice = price;
  },

  CHANGE_ADDITIONAL_AMOUNT: (state, { itemId, amount }) => {
    const itemIndex = state.additionals.findIndex((item) => item.id === itemId);

    if (amount <= 0) {
      state.additionals = state.additionals.filter(
        (item) => item.id !== itemId
      );
    } else {
      state.additionals[itemIndex].amount = amount;
    }
  },
};

const actions = {
  countPizzaPrice({ commit, rootGetters }) {
    const price =
      (rootGetters["Builder/getDoughPrice"] +
        rootGetters["Builder/getSaucePrice"] +
        rootGetters["Builder/getIngredientsPrice"]) *
      (rootGetters["Builder/getSizePrice"] || 1);

    commit("SET_PIZZA_PRICE", price);
  },

  changeAdditionalsAmount({ commit }, { itemId, amount }) {
    commit("CHANGE_ADDITIONAL_AMOUNT", { itemId, amount });
  },
};

const getters = {
  getPizzaPrice: (state, getters, rootState, rootGetters) => {
    return (
      (rootGetters["Builder/getDoughPrice"] +
        rootGetters["Builder/getSaucePrice"] +
        rootGetters["Builder/getIngredientsPrice"]) *
      (rootGetters["Builder/getSizePrice"] || 1)
    );
  },

  getAdditionals: (state) => state.additionals,
  getAdditionalsPrice: (state) => {
    return state.additionals.reduce((sum, item) => {
      sum += item.amount * item.price;

      return sum;
    }, 0);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
