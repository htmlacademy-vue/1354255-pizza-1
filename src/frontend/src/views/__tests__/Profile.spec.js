import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Profile from "@/views/Profile.vue";
import { generateMockStore } from "@/store/mocks";
import { setUser } from "@/store/mocks/setters";
import AddressForm from "@/modules/profile/AddressForm";
import { testAddress } from "@/store/mocks/setters.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Profile", () => {
  let store;
  let actions;
  let wrapper;
  let query;

  const createComponent = (options = {}) => {
    wrapper = mount(Profile, {
      ...options,
      mocks: {
        $api: {
          addresses: {
            query,
          },
        },
      },
      stubs: {
        AddressForm: true,
      },
    });
  };

  beforeEach(() => {
    query = jest.fn();
    query.mockResolvedValue([testAddress]);
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders", () => {
    setUser(store);
    createComponent({ localVue, store });
    expect(wrapper.find(".layout__content").exists()).toBeTruthy();
  });

  it("renders address list if not empty", async () => {
    setUser(store);
    createComponent({ localVue, store });
    expect(wrapper.find(".layout__address").exists()).toBeTruthy();
  });
});
