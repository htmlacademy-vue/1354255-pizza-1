<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" class="select" v-model="selectedOption">
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option value="3" v-if="isAuthorized">Существующий адрес</option>
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

      <div class="cart-form__address" v-if="selectedOption !== '1'">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              :readonly="isAuthorized && selectedOption !== '2'"
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
              :readonly="isAuthorized && selectedOption !== '2'"
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
              :readonly="isAuthorized && selectedOption !== '2'"
              v-model="flat"
            />
          </label>
        </div>

        <div class="cart-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              type="text"
              name="comment"
              v-model="comment"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EventBus from "@/eventBus";

export default {
  data() {
    return {
      selectedOption: "2",
      phone: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    };
  },

  computed: {
    ...mapState("Auth", ["isAuthorized"]),
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
  },
};
</script>

<style lang="scss">
.cart__form {
  margin-bottom: 25px;
}
</style>
