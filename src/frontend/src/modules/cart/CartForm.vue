<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          class="select"
          :selected="selectedOption"
          @change="onChange"
        >
          <option :value="BY_MYSELF">Заберу сам</option>
          <option :value="NEW_ADDRESS">Новый адрес</option>
          <optgroup
            v-if="isAuthorized && addressList"
            label="Существующий адрес"
          >
            <option
              v-for="({ name }, index) in addressList"
              :value="index"
              :key="index"
            >
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
          v-model="phone"
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
              v-model="street"
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
              v-model="building"
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
              v-model="flat"
            />
          </label>
        </div>

        <div class="cart-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input type="text" name="comment" v-model="comment" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EventBus from "@/eventBus";

const ORDER_RECEIVE_STATUS = {
  BY_MYSELF: "-2",
  NEW_ADDRESS: "-1",
};

export default {
  data() {
    return {
      selectedOption: ORDER_RECEIVE_STATUS.NEW_ADDRESS,
      phone: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
      addressList: [],
      ...ORDER_RECEIVE_STATUS,
    };
  },

  computed: {
    ...mapState("Auth", ["isAuthorized"]),
  },

  async created() {
    if (this.isAuthorized) {
      this.addressList = await this.$api.addresses.query();
    }
  },

  mounted() {
    EventBus.$on("placeOrder", this.passData);
  },

  methods: {
    passData() {
      this.$emit("passContacts", {
        phone: this.phone,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
      });
    },
    selectExistingAddress(addressIndex) {
      const address = this.addressList[addressIndex];

      this.street = address.street;
      this.building = address.building;
      this.flat = address.flat;
      this.comment = address.comment;
    },
    onChange(e) {
      const value = e.target.value;

      this.selectedOption = value;

      if (this.selectedOption >= 0) {
        this.selectExistingAddress(this.selectedOption);
      }
    },
  },
};
</script>

<style lang="scss">
.cart__form {
  margin-bottom: 25px;
}
</style>
