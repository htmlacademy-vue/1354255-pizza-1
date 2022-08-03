<template>
  <div class="cart__form" v-if="isLoaded">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          class="select"
          :value="selectedOption"
          @change="onChange"
        >
          <option :value="BY_MYSELF">Заберу сам</option>
          <option :value="NEW_ADDRESS">Новый адрес</option>
          <optgroup
            v-if="isAuthorized && addressList"
            label="Существующий адрес"
          >
            <option v-for="{ name, id } in addressList" :value="id" :key="id">
              {{ name }}
            </option>
          </optgroup>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          v-model.trim="phone"
        />
      </label>

      <div class="cart-form__address" v-if="selectedOption !== BY_MYSELF">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              :readonly="isAuthorized && selectedOption !== NEW_ADDRESS"
              v-model.trim="street"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              :readonly="isAuthorized && selectedOption !== NEW_ADDRESS"
              v-model.trim="building"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              :readonly="isAuthorized && selectedOption !== NEW_ADDRESS"
              v-model.trim="flat"
            />
          </label>
        </div>

        <div class="cart-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input type="text" name="comment" v-model.trim="comment" />
          </label>
        </div>
      </div>
    </div>
  </div>

  <app-loader v-else></app-loader>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { ORDER_RECEIVE_STATUS } from "@/common/constants";
import AppLoader from "@/common/components/AppLoader";

export default {
  components: { AppLoader },

  data() {
    return {
      isLoaded: false,
      addressList: [],
      ...ORDER_RECEIVE_STATUS,
    };
  },

  computed: {
    ...mapGetters("Auth", ["isAuthorized"]),
    ...mapState("Cart", {
      phoneState: (state) => state.phone,
      streetState: (state) => state.street,
      buildingState: (state) => state.building,
      flatState: (state) => state.flat,
      commentState: (state) => state.comment,
      selectedOption: (state) => state.selectedOption,
    }),
    phone: {
      get() {
        return this.phoneState;
      },
      set(value) {
        this.$store.commit("Cart/SET_PHONE", value);
      },
    },
    street: {
      get() {
        return this.streetState;
      },
      set(value) {
        this.$store.commit("Cart/SET_STREET", value);
      },
    },
    building: {
      get() {
        return this.buildingState;
      },
      set(value) {
        this.$store.commit("Cart/SET_BUILDING", value);
      },
    },
    flat: {
      get() {
        return this.flatState;
      },
      set(value) {
        this.$store.commit("Cart/SET_FLAT", value);
      },
    },
    comment: {
      get() {
        return this.commentState;
      },
      set(value) {
        this.$store.commit("Cart/SET_COMMENT", value);
      },
    },
  },

  async created() {
    if (this.isAuthorized) {
      this.addressList = await this.$api.addresses.query();
    }
    this.isLoaded = true;
  },

  methods: {
    selectExistingAddress(addressId) {
      const address = this.addressList.find((item) => +item.id === +addressId);

      this.$store.dispatch("Cart/setStreet", address.street);
      this.$store.dispatch("Cart/setBuilding", address.building);
      this.$store.dispatch("Cart/setFlat", address.flat);
      this.$store.dispatch("Cart/setComment", address.comment);
      this.$store.dispatch("Cart/setPhone", address.phone || "");
    },
    onChange(e) {
      const value = e.target.value;

      this.$store.dispatch("Cart/setSelectedOption", +value);

      if (this.selectedOption > 0) {
        this.selectExistingAddress(this.selectedOption);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cart__form {
  margin-bottom: 25px;
}

.input--big-label {
  max-width: 48%;
}
</style>
