import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Cart from "@/views/Cart.vue";
import { generateMockStore } from "@/store/mocks";
import { setPizza } from "@/store/mocks/setters";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Cart", () => {
  let store;
  let actions;
  let state;
  let wrapper;

  const createComponent = (options = {}) => {
    wrapper = mount(Cart, options);
  };

  beforeEach(() => {
    state = {
      Auth: {
        userId: "1234-1234-1234-1234",
        pizzas: [],
      },
    };
    actions = {
      Auth: {
        login: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders empty cart if there's no pizzas", () => {
    createComponent({ localVue, store });
    expect(wrapper.find(".cart__empty p").text()).toBe(
      "В корзине нет ни одного товара"
    );
  });

  it("renders pizzas list", () => {
    setPizza(store);
    createComponent({ localVue, store });
    expect(wrapper.find(".layout-form").exists()).toBeTruthy();
  });
});
