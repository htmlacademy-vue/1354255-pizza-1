import { shallowMount } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout";

const mocks = {
  $route: {
    meta: {
      layout: "",
    },
  },
};

describe("AppLayout", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  it("is rendered", () => {
    createComponent({ mocks });
    expect(wrapper.exists()).toBeTruthy();
  });
});
