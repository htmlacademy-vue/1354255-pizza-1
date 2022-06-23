import { doughDeclension } from "@/common/helpers";

const state = () => ({
  orderList: [],
});

const mutations = {
  SET_ORDERS: (state, orders) => {
    state.orderList = orders;
  },
};

const actions = {
  async loadOrders({ commit }) {
    const orders = await this.$api.orders.query();
    commit("SET_ORDERS", orders);
  },

  addPizzaToCart({ commit }, pizza) {
    commit("Cart/ADD_PIZZA", pizza, { root: true });
  },

  addMiscToCart({ commit }, misc) {
    commit("Cart/SET_ADDITIONALS", misc, { root: true });
  },
};

const getters = {
  getMisc:
    (state, getters, rootState) =>
    ({ miscId, quantity }) => {
      const currentMisc = rootState.miscData.find((item) => item.id === miscId);
      return { ...currentMisc, quantity };
    },
  getDough: (state, getters, rootState) => (doughId) => {
    const currentDough = rootState.doughData.find(
      (item) => item.id === doughId
    );
    return doughDeclension(currentDough.name);
  },
  getIngredients: (state, getters, rootState) => (ingredients) => {
    const result = ingredients.map((item) => {
      return rootState.ingredientsData.find(
        (elem) => elem.id === item.ingredientId
      );
    });

    return result.map((item) => item.name.toLowerCase()).join(", ");
  },
  getSauce: (state, getters, rootState) => (sauceId) => {
    const currentSauce = rootState.saucesData.find(
      (item) => item.id === sauceId
    );
    return currentSauce.name;
  },
  getSize: (state, getters, rootState) => (sizeId) => {
    const currentSize = rootState.sizesData.find((item) => item.id === sizeId);
    return currentSize.name;
  },
  getPizzaPrice: (state, getters, rootState) => (pizza) => {
    const doughPrice = rootState.doughData.find(
      (item) => item.id === pizza.doughId
    ).price;
    const saucePrice = rootState.saucesData.find(
      (item) => item.id === pizza.sauceId
    ).price;
    const sizePrice = rootState.sizesData.find(
      (item) => item.id === pizza.sizeId
    ).multiplier;
    const ingredientsPrice = pizza.ingredients.reduce((sum, item) => {
      const result =
        rootState.ingredientsData.find((elem) => elem.id === item.ingredientId)
          .price * item.quantity;

      return (sum += result);
    }, 0);

    return (
      (doughPrice + saucePrice + ingredientsPrice) * sizePrice * pizza.quantity
    );
  },
  getMiscPrice: (state, getters, rootState) => (orderMisc) => {
    return orderMisc.reduce((sum, item) => {
      const itemPrice =
        rootState.miscData.find((elem) => elem.id === item.miscId).price *
        item.quantity;

      return (sum += itemPrice);
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
