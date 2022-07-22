import { shallowMount } from "@vue/test-utils";
import AppPopup from "@/common/components/AppPopup";

describe("AppPopup", () => {
  const propsData = {
    isPopupOpen: true,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppPopup, options);
  };

  beforeEach(() => {
    createComponent({ propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("emits close when click on close btn", () => {
    let closeBtn = wrapper.find(".close");
    closeBtn.trigger("click");
    expect(wrapper.emitted("closePopup")).toBeTruthy();
  });

  it("emits close when click on 'Отлично, я жду!'", () => {
    let closeBtn = wrapper.find(".close");
    closeBtn.trigger("click");
    expect(wrapper.emitted("closePopup")).toBeTruthy();
  });
});
