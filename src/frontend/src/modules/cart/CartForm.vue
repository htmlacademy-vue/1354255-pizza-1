<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" class="select" v-model="selectedOption">
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option value="3" v-if="isAuthorized">Дом</option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input type="text" name="tel" placeholder="+7 999-999-99-99" />
      </label>

      <div class="cart-form__address" v-if="selectedOption !== '1'">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="street" :readonly="isAuthorized" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="house" :readonly="isAuthorized" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="apartment" :readonly="isAuthorized" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      selectedOption: "2",
    };
  },

  computed: {
    ...mapState("Auth", ["isAuthorized"]),
  },
};
</script>

<style lang="scss">
.cart__form {
  margin-bottom: 25px;
}
</style>
