const state = () => ({
  isAuthorized: false,
  user: null,
});

const mutations = {
  SET_AUTH: (state, authStatus) => {
    state.isAuthorized = authStatus;
  },

  SET_USER: (state, user) => {
    state.user = user;
  },
};

const actions = {
  async login({ dispatch }, credentials) {
    const data = await this.$api.auth.login(credentials);
    this.$jwt.saveToken(data.token);
    this.$api.auth.setAuthHeader();
    dispatch("getMe");
  },

  async logout({ commit }, sendRequest = true) {
    if (sendRequest) {
      await this.$api.auth.logout();
    }

    this.$jwt.destroyToken();
    this.$api.auth.setAuthHeader();
    commit("SET_AUTH", false);
    commit("SET_USER", null);
  },

  async getMe({ commit, dispatch }) {
    try {
      const data = await this.$api.auth.getMe();
      commit("SET_AUTH", true);
      commit("SET_USER", data);
    } catch {
      // Если токен авторизации  невалиден, или мы не смогли получить
      // данные пользователя по другой причине, делаем логаут без запроса на логаут на сервер.
      dispatch("logout", false);
    }
  },
};

const getters = {
  // геттер-функция для получения параметра по его названию из объекта user
  getUserAttribute: (state) => (attr) => state.user ? state.user[attr] : "",
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
