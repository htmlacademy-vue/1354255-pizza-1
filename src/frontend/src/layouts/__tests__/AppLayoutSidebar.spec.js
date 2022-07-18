import { shallowMount } from "@vue/test-utils";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";

const slots = {
  default: "test",
};

describe("AppLayoutSidebar", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutSidebar, options);
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
