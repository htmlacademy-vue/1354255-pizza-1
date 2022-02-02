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

  CHANGE_PIZZA_AMOUNT: (state, { pizzaName, amount }) => {
    const itemIndex = state.pizzas.findIndex((item) => item.name === pizzaName);

    if (amount <= 0) {
      state.pizzas = state.pizzas.filter((item) => item.name !== pizzaName);
    } else {
      state.pizzas[itemIndex].amount = amount;
    }
  },

  ADD_PIZZA: (state, pizza) => {
    state.pizzas.push(pizza);
  },
};

const actions = {
  changeAdditionalsAmount({ commit }, { itemId, amount }) {
    commit("CHANGE_ADDITIONALS_AMOUNT", { itemId, amount });
  },

  changePizzaAmount({ commit, dispatch }, { pizzaName, amount }) {
    commit("CHANGE_PIZZA_AMOUNT", { pizzaName, amount });

    if (amount === 0) {
      dispatch("Builder/resetState", null, { root: true });
    }
  },

  addPizzaToCart({ commit, rootGetters }) {
    commit("ADD_PIZZA", rootGetters["Builder/getCurrentPizza"]);
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
