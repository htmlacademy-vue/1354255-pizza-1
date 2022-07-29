import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter.vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPriceCounter", () => {
  let wrapper;
  let mocks;
  let store;
  let actions;
  let state;
  let getters;

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    state = {
      Builder: {
        pizzaName: "pizza",
      },
    };
    getters = {
      doughPrice: () => 300,
      sizePrice: () => 1,
      saucePrice: () => 50,
      ingredientsPrice: () => 33,
      getPizzaPrice: () => 383,
    };
    actions = {
      Cart: {
        addPizzaToCart: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks = {
      $router: {
        push: jest.fn(),
      },
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, mocks, store });
    expect(wrapper.exists()).toBeTruthy();
  });
});
