import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";

class BaseApiService {}

export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(resource) {
    super();
    this.#resource = resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

// Наследуемся от Read-only API-сервиса и добавляем операции post, put, delete
export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource) {
    super(resource);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class AuthApiService extends BaseApiService {
  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    // получаем профиль залогиненного пользователя
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

export class DoughApiService extends ReadOnlyApiService {
  constructor() {
    super("dough");
  }
  static getTypeFromImg = (pathToImg) => {
    return pathToImg.replace(/\/public\/img\/dough-([\D]+)\.svg/, "$1");
  };

  _normalize(dough) {
    return {
      ...dough,
      type: DoughApiService.getTypeFromImg(dough.image),
    };
  }

  async query(config = {}) {
    const doughList = await super.query(config);
    return doughList.map((item) => this._normalize(item));
  }
}

export class SauceApiService extends ReadOnlyApiService {
  constructor() {
    super("sauces");
  }

  static getSauce = (sauceName) => {
    if (sauceName === "Томатный") {
      return "tomato";
    } else {
      return "creamy";
    }
  };

  _normalize(sauce) {
    return {
      ...sauce,
      type: SauceApiService.getSauce(sauce.name),
    };
  }

  async query(config = {}) {
    const sauceList = await super.query(config);
    return sauceList.map((item) => this._normalize(item));
  }
}

export class FillingApiService extends ReadOnlyApiService {
  constructor() {
    super("ingredients");
  }

  static getFillingFromImg = (pathToImg) => {
    return pathToImg.replace(/\/public\/img\/filling\/([\D]+)\.svg/, "$1");
  };

  _normalize(ingredient) {
    return {
      ...ingredient,
      filling: FillingApiService.getFillingFromImg(ingredient.image),
    };
  }

  async query(config = {}) {
    const ingredients = await super.query(config);
    return ingredients.map((item) => this._normalize(item));
  }
}

export class SizeApiService extends ReadOnlyApiService {
  constructor() {
    super("sizes");
  }

  static getSize = (sizeName) => {
    switch (sizeName) {
      case "23 см":
        return "small";

      case "32 см":
        return "normal";

      case "45 см":
        return "big";

      default:
        return "small";
    }
  };

  _normalize(size) {
    return {
      ...size,
      type: SizeApiService.getSize(size.name),
    };
  }

  async query(config = {}) {
    const sizes = await super.query(config);
    return sizes.map((item) => this._normalize(item));
  }
}

export class MiscApiService extends ReadOnlyApiService {
  constructor() {
    super("misc");
  }

  static getAdditionalItemSlug = (pathToImg) => {
    return pathToImg.replace(/\/public\/img\/([\D]+)\.svg/, "$1");
  };

  _normalize(item) {
    return {
      ...item,
      slug: MiscApiService.getAdditionalItemSlug(item.image),
      amount: 1,
    };
  }

  async query(config = {}) {
    const miscList = await super.query(config);
    return miscList.map((item) => this._normalize(item));
  }
}
