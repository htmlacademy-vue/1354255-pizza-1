const state = () => ({
  miscData: [],
  doughData: [],
  ingredientsData: [],
  saucesData: [],
  sizesData: [],
});

const mutations = {
  SET_MISC_DATA: (state, misc) => {
    state.miscData = misc;
  },
  SET_DOUGH_DATA: (state, dough) => {
    state.doughData = dough;
  },
  SET_INGREDIENTS_DATA: (state, ingredients) => {
    state.ingredientsData = ingredients;
  },
  SET_SAUCES_DATA: (state, sauces) => {
    state.saucesData = sauces;
  },
  SET_SIZES_DATA: (state, sizes) => {
    state.sizesData = sizes;
  },
};

const actions = {
  async loadAllPizzaStuff({ commit }) {
    try {
      const [miscData, doughData, sauceData, sizeData, ingredientData] =
        await Promise.all([
          this.$api.misc.query(),
          this.$api.dough.query(),
          this.$api.sauce.query(),
          this.$api.size.query(),
          this.$api.ingredients.query(),
        ]);

      commit("SET_MISC_DATA", miscData);
      commit("SET_DOUGH_DATA", doughData);
      commit("SET_SAUCES_DATA", sauceData);
      commit("SET_SIZES_DATA", sizeData);
      commit("SET_INGREDIENTS_DATA", ingredientData);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
