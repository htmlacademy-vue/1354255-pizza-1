import { mount, createLocalVue } from "@vue/test-utils";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { setSaucesData, setIngredientsData } from "@/store/mocks/setters.js";
import pizzaData from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderIngredientsSelector", () => {
  let wrapper;
  let store;
  let actions;
  let state;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    state = {
      Common: {
        doughData: pizzaData.dough,
      },
    };
    actions = {
      Builder: {
        selectSauce: jest.fn(),
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

  it("dispatchs selectSauce action", async () => {
    setSaucesData(store);
    setIngredientsData(store);
    createComponent({
      localVue,
      store,
      mocks: {
        $store: {
          state: {
            saucesData: pizzaData.sauces,
            ingredientData: pizzaData.ingredients,
          },
        },
      },
    });
    const radioBtns = wrapper.findAll("[data-test='radio-button']");
    await radioBtns.at(1).trigger("click");
    expect(actions.Builder.selectSauce).toHaveBeenCalled();
  });

  it("renders fillings list", () => {
    setSaucesData(store);
    setIngredientsData(store);
    createComponent({
      localVue,
      store,
      mocks: {
        $store: {
          state: {
            saucesData: pizzaData.sauces,
            ingredientData: pizzaData.ingredients,
          },
        },
      },
    });
    const listItems = wrapper.findAll(".ingredients__item");
    expect(listItems.length).toBe(pizzaData.ingredients.length);
  });
});
