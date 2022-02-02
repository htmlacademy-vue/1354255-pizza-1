import data from "@/static/misc.json";
import { getAdditionalItems } from "@/common/helpers.js";

const state = () => ({
  additionals: getAdditionalItems(data),
  pizzas: [],
});

const mutations = {
  CHANGE_ADDITIONALS_AMOUNT: (state, { itemId, amount }) => {
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
  changeAdditionalsAmount({ commit }, { itemId, amount }) {
    commit("CHANGE_ADDITIONALS_AMOUNT", { itemId, amount });
  },
};

const getters = {
  getAdditionals: (state) => state.additionals,

  getAdditionalsPrice: (state) => {
    return state.additionals.reduce((sum, item) => {
      sum += item.amount * item.price;

      return sum;
    }, 0);
  },

  getPizzas: (state) => state.pizzas,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
