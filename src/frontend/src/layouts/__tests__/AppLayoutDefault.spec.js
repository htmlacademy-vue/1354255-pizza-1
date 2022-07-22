import { shallowMount } from "@vue/test-utils";
import AppLayoutDefault from "@/layouts/AppLayoutDefault";

const slots = {
  default: "test",
};

describe("AppLayoutDefault", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutDefault, options);
  };

  beforeEach(() => {
    createComponent({ slots });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders out the slot content", () => {
    expect(wrapper.html()).toContain(slots.default);
  });
});
