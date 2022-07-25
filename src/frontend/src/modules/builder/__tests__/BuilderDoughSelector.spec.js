import { mount, createLocalVue } from "@vue/test-utils";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { testPizza } from "@/store/mocks/setters.js";
import { setDoughData } from "@/store/mocks/setters.js";
import pizzaData from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderDoughSelector", () => {
  let wrapper;
  let store;
  let actions;
  let state;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    state = {
      Common: {
        doughData: pizzaData.dough,
      },
    };
    actions = {
      Builder: {
        selectDough: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("dispatchs selectDough action", async () => {
    setDoughData(store);
    createComponent({
      localVue,
      store,
      mocks: {
        $store: {
          state: { doughData: pizzaData.dough },
        },
      },
    });
    const radioBtns = wrapper.findAll("[data-test='radio-button']");
    console.log(wrapper.html());
    // await radioBtns.at(0).trigger("change");
    // expect(actions.Builder.selectDough).toHaveBeenCalled();
    // expect(pizzaParams.at(1).text()).toBe(`Соус: ${testPizza.sauce.name}`);
    // expect(pizzaParams.at(2).text()).toBe("Начинка: Грибы");
  });

  // it("increases pizza", async () => {
  //   await wrapper.find(".counter__button--plus").trigger("click");
  //   expect(actions.Cart.increasePizza).toHaveBeenCalled();
  // });

  // it("decreases pizza", async () => {
  //   await wrapper.find(".counter__button--minus").trigger("click");
  //   expect(actions.Cart.decreasePizza).toHaveBeenCalled();
  // });

  // it("changes amount and goes to main", async () => {
  //   await wrapper.find(".cart-list__edit").trigger("click");
  //   expect(actions.Cart.changePizzaParams).toHaveBeenCalled();
  //   expect(mocks.$router.push).toHaveBeenCalledWith("/");
  // });
});
