import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Profile from "@/views/Profile.vue";
import { generateMockStore } from "@/store/mocks";
import { setUser } from "@/store/mocks/setters";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Profile", () => {
  let store;
  let actions;
  let state;
  let wrapper;

  const createComponent = (options = {}) => {
    wrapper = mount(Profile, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", async () => {
    setUser(store);
    createComponent({ localVue, store });
    await flushPromises();
    expect(wrapper.find(".layout__content").exists()).toBeTruthy();
  });
});
