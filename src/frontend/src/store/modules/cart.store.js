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

  CHANGE_PIZZA_AMOUNT: (state, { pizzaIndex, amount }) => {
    state.pizzas[pizzaIndex].amount = amount;
  },

  CHANGE_PIZZA_PRICE: (state, { pizzaIndex, amount }) => {
    state.pizzas[pizzaIndex].price *= amount;
  },

  REMOVE_PIZZA: (state, pizzaName) => {
    state.pizzas = state.pizzas.filter((item) => item.name !== pizzaName);
  },

  ADD_PIZZA: (state, pizza) => {
    state.pizzas.push(pizza);
  },
};

const actions = {
  changeAdditionalsAmount({ commit }, { itemId, amount }) {
    commit("CHANGE_ADDITIONALS_AMOUNT", { itemId, amount });
  },

  changePizzaAmount({ commit, state }, { pizzaName, amount }) {
    const pizzaIndex = state.pizzas.findIndex(
      (item) => item.name === pizzaName
    );

    if (amount <= 0) {
      commit("REMOVE_PIZZA", pizzaName);
    } else {
      commit("CHANGE_PIZZA_AMOUNT", { pizzaIndex, amount });
      commit("CHANGE_PIZZA_PRICE", { pizzaIndex, amount });
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
