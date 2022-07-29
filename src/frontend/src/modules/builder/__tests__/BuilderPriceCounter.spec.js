import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter.vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import {
  setPizzaName,
  selectDough,
  selectSize,
  selectSauce,
} from "@/store/mocks/setters";

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
      Builder: {
        getDoughPrice: () => 300,
        getSizePrice: () => 1,
        getSaucePrice: () => 50,
        getIngredientsPrice: () => 33,
        getPizzaPrice: () => 383,
      },
    };
    actions = {
      Cart: {
        addPizzaToCart: jest.fn(),
      },
    };
    store = generateMockStore(actions, getters);
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

  it("adds pizza to cart", async () => {
    setPizzaName(store);
    selectDough(store);
    selectSize(store);
    selectSauce(store);
    createComponent({ localVue, store, mocks });
    const btn = wrapper.find(".button");
    await wrapper.find(".button").trigger("click");
    expect(actions.Cart.addPizzaToCart).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith({"name": "Cart"});
  });
});
