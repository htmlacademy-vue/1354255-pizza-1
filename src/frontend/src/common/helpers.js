import resources from "@/common/enums/resources";
import {
  AuthApiService,
  CrudApiService,
  DoughApiService,
  SauceApiService,
  FillingApiService,
  SizeApiService,
  MiscApiService,
} from "@/services/api.service";

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.ADDRESS]: new CrudApiService(resources.ADDRESS),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS),
    [resources.DOUGH]: new DoughApiService(),
    [resources.SAUCE]: new SauceApiService(),
    [resources.INGREDIENTS]: new FillingApiService(),
    [resources.SIZE]: new SizeApiService(),
    [resources.MISC]: new MiscApiService(),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

export const generateId = () => {
  return Date.now();
};
