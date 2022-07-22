import { shallowMount } from "@vue/test-utils";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem";

describe("CartAdditionalItem", () => {
  const propsData = {
    item: {
      id: 3,
      name: 'Картошка из печи',
      amount: 2,
      price: '170',
      slug: 'potato',
    },
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(CartAdditionalItem, options);
  };

  beforeEach(() => {
    createComponent({ propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("shows item name", () => {
    const name = wrapper.find(".additional-list__description > span")
    expect(name.html()).toContain(propsData.item.name);
  });

  it("shows amount", () => {
    const input = wrapper.find("input");

    expect(+input.element.value).toBe(+propsData.item.amount);
  });

  it("shows price", () => {
    const price = wrapper.find(".additional-list__price");

    expect(price.html()).toContain(+propsData.item.price);
  });
});
