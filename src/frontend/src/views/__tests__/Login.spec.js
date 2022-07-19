import { mount, createLocalVue } from "@vue/test-utils";
import Login from "@/views/Login.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Login", () => {
  let wrapper;
  let dispatch;
  let login;
  let actions;

  const methods = {
    login,
  };

  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $store: {
      dispatch,
    },
  };

  beforeEach(() => {
    actions = {
      Auth: {
        login: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    dispatch = jest.fn();
    login = jest.fn();
    methods.login = login;
    mocks.$router.push = jest.fn();
    mocks.$store.dispatch = dispatch;
  });

  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });

  it.only("calls login and redirects to index if credentials are valid", async () => {
    createComponent({ localVue, mocks });
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
    // expect(dispatch).toHaveBeenCalled();
    expect(actions.Auth.login).toHaveBeenCalled("Auth");
    // expect(mocks.$router.push).toHaveBeenCalledWith({ name: "Main" });
  });
});
