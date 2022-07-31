import { shallowMount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter", () => {
  const propsData = {
    startValue: 1,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  beforeEach(() => {
    createComponent({ propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("has start value", async () => {
    const input = wrapper.find("input");

    expect(+input.element.value).toBe(propsData.startValue);
  });

  it("emits increase event", async () => {
    const increaseBtn = wrapper.find(".counter__button--plus");
    await increaseBtn.trigger("click");
    expect(wrapper.emitted("changeAmount")).toBeTruthy();
    expect(wrapper.emitted("changeAmount")[0]).toEqual(["increase"]);
  });

  it("emits decrease event", async () => {
    const decreaseBtn = wrapper.find(".counter__button--minus");
    await decreaseBtn.trigger("click");
    expect(wrapper.emitted("changeAmount")).toBeTruthy();
    expect(wrapper.emitted("changeAmount")[0]).toEqual(["decrease"]);
  });
});
