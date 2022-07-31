import { mount, createLocalVue } from "@vue/test-utils";
import CartPizzaItem from "@/modules/cart/CartPizzaItem";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { testPizza } from "@/store/mocks/setters.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartPizzaItem", () => {
  const propsData = {
    pizza: testPizza,
  };

  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(CartPizzaItem, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        increasePizza: jest.fn(),
        decreasePizza: jest.fn(),
        changePizzaParams: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createComponent({ localVue, store, propsData, mocks });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders pizza parameters", () => {
    const pizzaParams = wrapper.findAll(".product__text ul li");
    expect(wrapper.find(".product__text h2").text()).toBe(testPizza.name);
    expect(pizzaParams.at(0).text()).toBe(
      `${testPizza.size.name}, на\n          тонком тесте`
    );
    expect(pizzaParams.at(1).text()).toBe(`Соус: ${testPizza.sauce.name}`);
    expect(pizzaParams.at(2).text()).toBe("Начинка: Грибы");
  });

  it("increases pizza", async () => {
    await wrapper.find(".counter__button--plus").trigger("click");
    expect(actions.Cart.increasePizza).toHaveBeenCalled();
  });

  it("decreases pizza", async () => {
    await wrapper.find(".counter__button--minus").trigger("click");
    expect(actions.Cart.decreasePizza).toHaveBeenCalled();
  });

  it("changes amount and goes to main", async () => {
    await wrapper.find(".cart-list__edit").trigger("click");
    expect(actions.Cart.changePizzaParams).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});
