import { mount, createLocalVue } from "@vue/test-utils";
import Orders from "@/views/Orders.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { setOrders } from "@/store/mocks/setters.js";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Orders", () => {
  let wrapper;
  let actions;
  let store;
  let getters;

  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };

  beforeEach(() => {
    actions = {
      Common: {
        loadAllPizzaStuff: jest.fn(),
      },
      Orders: {
        loadOrders: jest.fn(),
      },
    };

    getters = {
      Orders: {
        getPizzaPrice: () => 383,
        getMiscPrice: () => 0,
      },
    };

    store = { ...generateMockStore(actions), getters };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", async () => {
    setOrders(store);
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });
});
