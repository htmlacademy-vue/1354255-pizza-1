import { ORDER_RECEIVE_STATUS } from "@/common/constants";

const setupState = () => ({
  additionals: [],
  pizzas: [],
  phone: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
  selectedOption: ORDER_RECEIVE_STATUS.NEW_ADDRESS,
});

const state = setupState();

const mutations = {
  SET_ADDITIONALS: (state, additionals) => {
    state.additionals = additionals;
  },

  CHANGE_ADDITIONALS_AMOUNT: (state, { itemId, amount }) => {
    const itemIndex = state.additionals.findIndex((item) => item.id === itemId);

    if (amount < 0) {
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

  REMOVE_PIZZA: (state, pizzaId) => {
    state.pizzas = state.pizzas.filter((item) => item.id !== pizzaId);
  },

  ADD_PIZZA: (state, pizza) => {
    state.pizzas.push(pizza);
  },

  RESET_STATE: (state) => {
    Object.assign(state, setupState());
  },

  SET_PHONE: (state, phone) => {
    state.phone = phone;
  },

  SET_STREET: (state, street) => {
    state.street = street;
  },

  SET_BUILDING: (state, building) => {
    state.building = building;
  },

  SET_FLAT: (state, flat) => {
    state.flat = flat;
  },

  SET_COMMENT: (state, comment) => {
    state.comment = comment;
  },

  SET_SELECTED_OPTION: (state, option) => {
    state.selectedOption = option;
  },
};

const actions = {
  async loadAdditionals({ commit }) {
    const additionals = await this.$api.misc.query();
    const normalizedAdditionals = additionals.map((item) => ({
      ...item,
      amount: 0,
    }));
    commit("SET_ADDITIONALS", normalizedAdditionals);
  },

  changeAdditionalsAmount({ commit }, { itemId, amount }) {
    commit("CHANGE_ADDITIONALS_AMOUNT", { itemId, amount });
  },

  increasePizza({ commit, state }, pizzaId) {
    const pizzaIndex = state.pizzas.findIndex((item) => item.id === pizzaId);

    commit("INCREASE_PIZZA", pizzaIndex);
  },

  decreasePizza({ commit, state }, pizzaId) {
    const pizzaIndex = state.pizzas.findIndex((item) => item.id === pizzaId);

    if (state.pizzas[pizzaIndex].amount === 1) {
      commit("REMOVE_PIZZA", pizzaId);
    } else {
      commit("DECREASE_PIZZA", pizzaIndex);
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
    await dispatch("Builder/setIngredients", pizza.ingredients, {
      root: true,
    });

    commit("REMOVE_PIZZA", pizzaId);
  },

  resetCart({ commit }) {
    commit("RESET_STATE");
  },

  setPhone({ commit }, phone) {
    commit("SET_PHONE", phone);
  },

  setStreet({ commit }, street) {
    commit("SET_STREET", street);
  },

  setBuilding({ commit }, building) {
    commit("SET_BUILDING", building);
  },

  setFlat({ commit }, flat) {
    commit("SET_FLAT", flat);
  },

  setComment({ commit }, comment) {
    commit("SET_COMMENT", comment);
  },

  setSelectedOption({ commit }, option) {
    commit("SET_SELECTED_OPTION", option);
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
      sum += pizza.price * pizza.amount;

      return sum;
    }, 0),

  getPizzaPrice: (state) => (pizzaId) => {
    const currentPizza = state.pizzas.find((pizza) => pizza.id === pizzaId);

    return currentPizza.price * currentPizza.amount;
  },

  getTotalPrice: (state, getters) =>
    getters.getAdditionalsPrice + getters.getPizzasPrice,

  isStreetValid: (state) => !!state.street,

  isBuildingValid: (state) => !!state.building,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
