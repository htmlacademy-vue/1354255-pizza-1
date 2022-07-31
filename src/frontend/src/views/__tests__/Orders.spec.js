import { mount, createLocalVue } from "@vue/test-utils";
import Orders from "@/views/Orders.vue";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import {
  setOrders,
  testMisc,
  testDough,
  testSize,
  testSauce,
  testIngredients,
} from "@/store/mocks/setters.js";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Orders", () => {
  let wrapper;
  let actions;
  let store;
  let getters;
  let query;
  let mocks;

  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };

  beforeEach(() => {
    query = jest.fn();
    query.mockResolvedValue(["OK"]);
    mocks = {
      $api: {
        orders: {
          delete: query,
        },
      },
      $router: {
        push: jest.fn(),
      },
    };
    actions = {
      Common: {
        loadAllPizzaStuff: jest.fn(),
      },
      Orders: {
        loadOrders: jest.fn(),
        addMiscToCart: jest.fn(),
        addPizzaToCart: jest.fn(),
      },
      Cart: {
        setFlat: jest.fn(),
        setComment: jest.fn(),
        setSelectedOption: jest.fn(),
        setStreet: jest.fn(),
        setBuilding: jest.fn(),
      },
    };

    getters = {
      Orders: {
        getPizzaPrice: () => () => 383,
        getMiscPrice: () => () => 0,
        getMisc: () => () => testMisc,
        getDough: () => () => testDough,
        getSize: () => () => testSize,
        getSauce: () => () => testSauce,
        getIngredients: () => () => testIngredients,
      },
    };

    store = generateMockStore(actions, getters);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered and loaded", async () => {
    setOrders(store);
    createComponent({ localVue, store });
    await flushPromises();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(".title--big").text()).toBe("История заказов");
  });

  it("shows correct data", async () => {
    setOrders(store);
    createComponent({ localVue, store });
    await flushPromises();
    expect(wrapper.find(".order__number").text()).toBe("Заказ #1");
    expect(wrapper.find(".order__sum").text()).toBe("Сумма заказа: 383 ₽");
  });

  it("deletes order", async () => {
    setOrders(store);
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const deleteBtn = wrapper.find(".button--border");
    await deleteBtn.trigger("click");
    await mocks.$api.orders.delete();
    expect(actions.Orders.loadOrders).toHaveBeenCalled();
  });

  it("repeats order", async () => {
    setOrders(store);
    createComponent({ localVue, store });
    await flushPromises();
    const repeatBtn = wrapper.find(".repeat");
    await repeatBtn.trigger("click");
    expect(actions.Orders.addPizzaToCart).toHaveBeenCalled();
    expect(actions.Orders.addMiscToCart).toHaveBeenCalled();
    expect(actions.Cart.setStreet).toHaveBeenCalled();
    expect(actions.Cart.setBuilding).toHaveBeenCalled();
    expect(actions.Cart.setFlat).toHaveBeenCalled();
    expect(actions.Cart.setComment).toHaveBeenCalled();
    expect(actions.Cart.setSelectedOption).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: "Cart" });
  });
});
