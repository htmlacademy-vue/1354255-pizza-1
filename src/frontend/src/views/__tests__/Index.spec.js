import { mount, createLocalVue } from "@vue/test-utils";
import Index from "@/views/Index.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import {
  setMiscData,
  setSaucesData,
  setSizesData,
  setIngredientsData,
  selectDough,
  selectSize,
  selectSauce,
} from "@/store/mocks/setters.js";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Index", () => {
  let wrapper;
  let actions;
  let store;

  const createComponent = (options) => {
    wrapper = mount(Index, options);
  };

  beforeEach(() => {
    actions = {
      Common: {
        loadAllPizzaStuff: jest.fn(),
      },
      Builder: {
        selectDough: jest.fn(),
        selectSize: jest.fn(),
        selectSauce: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", async () => {
    selectDough(store);
    selectSize(store);
    selectSauce(store);
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("calls actions if nothing was selected", async () => {
    createComponent({ localVue, store });
    expect(actions.Common.loadAllPizzaStuff).toHaveBeenCalled();
    await flushPromises();
    expect(actions.Builder.selectDough).toHaveBeenCalled();
    expect(actions.Builder.selectSize).toHaveBeenCalled();
    expect(actions.Builder.selectSauce).toHaveBeenCalled();
  });

  it("calls only load stuff if there're selected items", async () => {
    selectDough(store);
    selectSize(store);
    selectSauce(store);
    createComponent({ localVue, store });
    expect(actions.Common.loadAllPizzaStuff).toHaveBeenCalled();
    await flushPromises();
    expect(actions.Builder.selectDough).not.toHaveBeenCalled();
    expect(actions.Builder.selectSize).not.toHaveBeenCalled();
    expect(actions.Builder.selectSauce).not.toHaveBeenCalled();
  });
});
