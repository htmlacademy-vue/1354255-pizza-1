import { mount, createLocalVue } from "@vue/test-utils";
import Index from "@/views/Index.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import {
  setMiscData,
  setDoughData,
  setSaucesData,
  setSizesData,
  setIngredientsData,
  selectDough,
  selectSize,
  selectSauce,
} from "@/store/mocks/setters.js";

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

  it("calls actions if nothing was selected", () => {
    const selectedDough = {
      id: 1,
      name: "Тонкое",
      image: "/public/img/dough-light.svg",
      description: "Из твердых сортов пшеницы",
      price: 300,
    };

    const selectedSauce = {
      id: 1,
      name: "Томатный",
      price: 50,
    };

    const selectedSize = {
      id: 1,
      name: "23 см",
      image: "/public/img/diameter.svg",
      multiplier: 1,
    };

    createComponent({ localVue, store });
    expect(actions.Builder.selectDough).toHaveBeenCalledWith(
      expect.anything(),
      selectedDough
    );
    expect(actions.Builder.selectedSauce).toHaveBeenCalledWith(
      expect.anything(),
      selectedSauce
    );
    expect(actions.Builder.selectedSize).toHaveBeenCalledWith(
      expect.anything(),
      selectedSize
    );
  });
});
