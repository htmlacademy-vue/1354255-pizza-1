import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/common/components/RadioButton";

describe("RadioButton", () => {
  const propsData = {
    labelClasses: ["testClass"],
    inputValue: "testValue",
    inputName: "testName",
    description: "testDescription",
    checked: true,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(RadioButton, options);
  };

  beforeEach(() => {
    createComponent({ propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("sets the initial model value", () => {
    expect(wrapper.find("input").element.value).toBe(propsData.inputValue);
  });

  it("emits change event", () => {
    let checkbox = wrapper.find("input");
    checkbox.trigger("change");
    expect(wrapper.emitted().change).toBeTruthy();
  });

  it("name is prop name", () => {
    let checkbox = wrapper.find("input");
    expect(checkbox.attributes("name")).toBe(propsData.inputName);
  });

  it("label has classes", () => {
    let label = wrapper.find("label");
    expect(label.attributes("class")).toContain(propsData.labelClasses);
  });

  it("has description", () => {
    let description = wrapper.find("span");
    expect(description.html()).toContain(propsData.description);
  });

  it("is checked", () => {
    let checkbox = wrapper.find("input");
    expect(checkbox.element.value).toBeTruthy();
  });
});
