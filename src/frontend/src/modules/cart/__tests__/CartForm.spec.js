import { mount, createLocalVue } from "@vue/test-utils";
import CartForm from "@/modules/cart/CartForm";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { ORDER_RECEIVE_STATUS } from "@/common/constants";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartForm", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(CartForm, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        setSelectedOption: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("has have 'Новый адрес' option by default", () => {
    expect(wrapper.find("option:checked").element.value).toBe(
      ORDER_RECEIVE_STATUS.NEW_ADDRESS.toString()
    );
  });
});
