import { mount, createLocalVue } from "@vue/test-utils";
import Index from "@/views/Index.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Index", () => {
  let wrapper;
  let actions;
  let store;
  let mocks;

  const mockStore = {
    loadAllPizzaStuff: jest.fn(),
    Builder: {
      selectDough: jest.fn(),
      selectSize: jest.fn(),
      selectSauce: jest.fn(),
    },
  };

  const createComponent = (options) => {
    wrapper = mount(Index, options);
  };

  beforeEach(() => {
    mocks = {
      $store: mockStore,
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", async () => {
    createComponent({ localVue, store, mocks });

    await mockStore.loadAllPizzaStuff;
    expect(wrapper.exists()).toBeTruthy();
  });
});
