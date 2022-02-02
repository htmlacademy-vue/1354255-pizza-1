const state = () => ({
  pizzaPrice: 0,
});

const mutations = {
  SET_PIZZA_PRICE: (state, price) => {
    state.pizzaPrice = price;
  },
};

const actions = {
  countPrice({ commit, rootGetters }) {
    const price =
      (rootGetters["Builder/getDoughPrice"] +
        rootGetters["Builder/getSaucePrice"] +
        rootGetters["Builder/getIngredientsPrice"]) *
      (rootGetters["Builder/getSizePrice"] || 1);

    commit("SET_PIZZA_PRICE", price);
  },
};

const getters = {
  getPrice: (state, getters, rootState, rootGetters) => {
    return (
      (rootGetters["Builder/getDoughPrice"] +
        rootGetters["Builder/getSaucePrice"] +
        rootGetters["Builder/getIngredientsPrice"]) *
      (rootGetters["Builder/getSizePrice"] || 1)
    );
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
