import data from "@/static/misc.json";
import { getAdditionalItems } from "@/common/helpers.js";

const setupState = () => ({
  additionals: [],
  pizzas: [],
});

const state = setupState();

const mutations = {
  SET_ADDITIONALS: (state, additionals) => {
    state.additionals = additionals;
  },

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

  DECREASE_PIZZA: (state, pizzaIndex) => {
    state.pizzas[pizzaIndex].amount -= 1;
  },

  INCREASE_PIZZA: (state, pizzaIndex) => {
    state.pizzas[pizzaIndex].amount += 1;
  },

  CHANGE_PIZZA_PRICE: (state, { pizzaIndex, decrease }) => {
    if (decrease) {
      state.pizzas[pizzaIndex].price -= decrease;
    } else {
      state.pizzas[pizzaIndex].price *= state.pizzas[pizzaIndex].amount;
    }
  },

  REMOVE_PIZZA: (state, pizzaId) => {
    state.pizzas = state.pizzas.filter((item) => item.id !== pizzaId);
  },

  ADD_PIZZA: (state, pizza) => {
    state.pizzas.push(pizza);
  },

  RESET_STATE: (state) => {
    Object.assign(state, setupState());
  },
};

const actions = {
  loadAdditionals({ commit }) {
    commit("SET_ADDITIONALS", getAdditionalItems(data));
  },

  changeAdditionalsAmount({ commit }, { itemId, amount }) {
    commit("CHANGE_ADDITIONALS_AMOUNT", { itemId, amount });
  },

  increasePizza({ commit, state }, pizzaId) {
    const pizzaIndex = state.pizzas.findIndex((item) => item.id === pizzaId);

    commit("INCREASE_PIZZA", pizzaIndex);
    commit("CHANGE_PIZZA_PRICE", { pizzaIndex });
  },

  decreasePizza({ commit, state }, pizzaId) {
    const pizzaIndex = state.pizzas.findIndex((item) => item.id === pizzaId);

    if (state.pizzas[pizzaIndex].amount === 1) {
      commit("REMOVE_PIZZA", pizzaId);
    } else {
      const priceForOne =
        state.pizzas[pizzaIndex].price / state.pizzas[pizzaIndex].amount;
      commit("DECREASE_PIZZA", pizzaIndex);
      commit("CHANGE_PIZZA_PRICE", { pizzaIndex, decrease: priceForOne });
    }
  },

  addPizzaToCart({ commit, dispatch, rootGetters }) {
    commit("ADD_PIZZA", rootGetters["Builder/getCurrentPizza"]);
    dispatch("loadAdditionals");
  },

  async changePizzaParams({ state, commit, dispatch }, pizzaId) {
    const pizza = state.pizzas.find((item) => item.id === pizzaId);

    await dispatch("Builder/selectDough", pizza.dough, { root: true });
    await dispatch("Builder/selectSize", pizza.size, { root: true });
    await dispatch("Builder/selectSauce", pizza.sauce, { root: true });
    await dispatch("Builder/setIngredients", pizza.ingredients, { root: true });

    commit("REMOVE_PIZZA", pizzaId);
  },

  resetCart({ commit }) {
    commit("RESET_STATE");
  },
};

const getters = {
  getAdditionalsPrice: (state) => {
    return state.additionals.reduce((sum, item) => {
      sum += item.amount * item.price;

      return sum;
    }, 0);
  },

  getPizzasPrice: (state) =>
    state.pizzas.reduce((sum, pizza) => {
      sum += pizza.price;

      return sum;
    }, 0),

  getTotalPrice: (state, getters) =>
    getters.getAdditionalsPrice + getters.getPizzasPrice,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
