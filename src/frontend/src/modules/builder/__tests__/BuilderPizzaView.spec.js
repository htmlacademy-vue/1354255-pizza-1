import BuilderPizzaView from "@/modules/builder/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter.vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import {
  testDough,
  testSize,
  testSauce,
  testIngredients,
} from "@/store/mocks/setters.js";
import pizzaData from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPizzaView", () => {
  let stubs;
  let wrapper;
  let store;
  let actions;
  let state;
  let getters;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    stubs = {
      BuilderPriceCounter: true,
    };
    state = {
      Builder: {
        pizzaName: "pizza",
        selectedDough: testDough,
        selectedSize: testSize,
        selectedSauce: testSauce,
        selectedIngredients: testIngredients,
      },
    };
    getters = {
      Builder: {
        getSelectedIngredients: () => pizzaData.ingredients,
      },
    };
    actions = {
      Cart: {
        addPizzaToCart: jest.fn(),
      },
    };
    store = generateMockStore(actions, getters);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({
      localVue,
      store,
      state,
      stubs,
    });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("inputs pizza name", async () => {
    createComponent({
      localVue,
      store,
      state,
      stubs,
    });
    const textInput = wrapper.find('input[name="pizza_name"]');
    await textInput.setValue("test");
    expect(wrapper.find('input[type="text"]').element.value).toBe("test");
  });
});
