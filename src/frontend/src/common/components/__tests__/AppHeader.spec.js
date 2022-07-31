import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import AppHeader from "@/common/components/AppHeader";
import { authenticateUser } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppHeader", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const stubs = ["router-link"];

  let actions;
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AppHeader, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders cart", () => {
    createComponent({ localVue, store, mocks, stubs });
    const cart = wrapper.find(".header__cart");
    expect(cart.exists()).toBeTruthy();
  });

  it("renders login if not authorized", () => {
    createComponent({ localVue, store, mocks, stubs });
    const login = wrapper.find(".header__login");
    expect(login.exists()).toBeTruthy();
  });

  it("doesn't render logout if not authorized", () => {
    createComponent({ localVue, store, mocks, stubs });
    const logout = wrapper.find(".header__logout");
    expect(logout.exists()).toBeFalsy();
  });

  it("renders logout button if authorized", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const logout = wrapper.find(".header__logout");
    expect(logout.exists()).toBeTruthy();
  });

  it("doesn't render login button if authorized", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const login = wrapper.find(".header__login");
    expect(login.exists()).toBeFalsy();
  });

  it("renders link to profile if authorized", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const link = wrapper.find(".header__user");
    expect(link.exists()).toBeTruthy();
  });

  it("calls logout on logout button click", async () => {
    authenticateUser(store);
    createComponent({ localVue, mocks, store, stubs });
    const logout = wrapper.find(".header__logout");
    await logout.trigger("click");
    expect(actions.Auth.logout).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: "Main" });
  });

  it("redirects to login on click", async () => {
    createComponent({ localVue, store, mocks, stubs });
    const login = wrapper.find(".header__login");
    await login.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: "Login" });
  });
});
