import { mount, createLocalVue } from "@vue/test-utils";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { setSizesData } from "@/store/mocks/setters.js";
import pizzaData from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderSizeSelector", () => {
  let wrapper;
  let store;
  let actions;
  let state;

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    state = {
      Common: {
        doughData: pizzaData.sizes,
      },
    };
    actions = {
      Builder: {
        selectSize: jest.fn(),
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

  it("dispatchs selectSize action", async () => {
    setSizesData(store);
    createComponent({
      localVue,
      store,
      mocks: {
        $store: {
          state: { sizesData: pizzaData.sizes },
        },
      },
    });
    const radioBtns = wrapper.findAll("[data-test='radio-button']");
    await radioBtns.at(1).trigger("click");
    expect(actions.Builder.selectSize).toHaveBeenCalled();
  });
});
