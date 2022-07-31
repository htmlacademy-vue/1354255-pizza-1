import { shallowMount } from "@vue/test-utils";
import AddressForm from "@/modules/profile/AddressForm";

describe("AddressForm", () => {
  const propsData = {
    addressToEdit: {
      name: "Домашний",
      street: "Ленина",
      building: "42",
      flat: "5",
      comment: "у двери оставьте",
    },
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AddressForm, options);
  };

  beforeEach(() => {
    createComponent({ propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("shows address name", () => {
    expect(wrapper.find('input[name="addr-name"]').element.value).toBe(
      propsData.addressToEdit.name
    );
  });

  it("shows street", () => {
    expect(wrapper.find('input[name="addr-street"]').element.value).toBe(
      propsData.addressToEdit.street
    );
  });

  it("shows building", () => {
    expect(wrapper.find('input[name="addr-house"]').element.value).toBe(
      propsData.addressToEdit.building
    );
  });

  it("shows flat", () => {
    expect(wrapper.find('input[name="addr-apartment"]').element.value).toBe(
      propsData.addressToEdit.flat
    );
  });

  it("shows comment", () => {
    expect(wrapper.find('input[name="addr-comment"]').element.value).toBe(
      propsData.addressToEdit.comment
    );
  });
});
