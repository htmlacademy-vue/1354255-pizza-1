import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [VuexPlugins],
});
