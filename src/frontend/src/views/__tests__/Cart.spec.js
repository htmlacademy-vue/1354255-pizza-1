import { mount, createLocalVue } from "@vue/test-utils";
import Cart from "@/views/Cart.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Cart", () => {
  const createComponent = (options = {}) => {
    wrapper = mount(Cart, options);
  };

  it("renders empty cart", () => {
    createComponent();
    expect(wrapper.find('.cart__empty p').text()).toBe('В корзине нет ни одного товара');
  })
});
