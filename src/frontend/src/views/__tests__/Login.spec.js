import { mount, createLocalVue } from "@vue/test-utils";
import Login from "@/views/Login.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Login", () => {
  let wrapper;
  let actions;
  let store;

  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        login: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$router.push = jest.fn();

    createComponent({ localVue, mocks, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("calls login and redirects to index if credentials are valid", async () => {
    const userCredentials = {
      email: "user@example.com",
      password: "user@example.com",
    };

    const emailInput = wrapper.find('input[type="email"]');
    const passInput = wrapper.find('input[type="password"]');

    emailInput.element.value = userCredentials.email;
    await emailInput.trigger("input");
    passInput.element.value = userCredentials.password;
    await passInput.trigger("input");

    await wrapper.find("form").trigger("submit");
    expect(actions.Auth.login).toHaveBeenCalledWith(
      expect.anything(),
      userCredentials
    );
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: "Main" });
  });
});
