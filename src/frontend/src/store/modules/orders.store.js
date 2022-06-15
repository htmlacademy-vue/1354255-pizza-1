const state = () => ({
  orderList: [],
  miscList: [],
});

const mutations = {
  SET_ORDERS: (state, orders) => {
    state.orderList = orders;
  },

  SET_MISC: (state, misc) => {
    state.miscList = misc;
  },
};

const actions = {
  async loadOrders({ commit }) {
    const orders = await this.$api.orders.query();
    commit("SET_ORDERS", orders);
  },

  async loadMisc({ commit }) {
    const misc = await this.$api.misc.query();
    commit("SET_MISC", misc);
  },
};

const getters = {
  getMisc:
    (state) =>
    ({ miscId, quantity }) => {
      const currentMisc = state.miscList.find((item) => item.id === miscId);
      return { ...currentMisc, quantity };
    },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
