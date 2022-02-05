const state = () => ({
  isAuthorized: false,
});

const mutations = {
  SET_AUTH: (state, authStatus) => {
    state.isAuthorized = authStatus;
  },
};

const actions = {
  login({ commit }) {
    commit("SET_AUTH", true);
  },
  logout({ commit }) {
    commit("SET_AUTH", false);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
