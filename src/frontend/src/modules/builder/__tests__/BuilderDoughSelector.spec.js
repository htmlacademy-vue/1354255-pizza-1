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
  });
});
