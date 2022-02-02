<template>
  <div class="sheet cart__empty" v-if="!pizzas.length">
    <p>В корзине нет ни одного товара</p>
  </div>

  <form action="test.html" method="post" class="layout-form" v-else>
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <ul class="cart-list sheet">
          <CartPizzaItem
            v-for="pizza in pizzas"
            :key="pizza.name"
            :pizza="pizza"
          />
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <CartAdditionalItem
              v-for="item in additionalItems"
              :key="item.id"
              :item="item"
            />
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select name="test" class="select">
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option value="3">Дом</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input type="text" name="tel" placeholder="+7 999-999-99-99" />
            </label>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input type="text" name="street" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input type="text" name="house" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input type="text" name="apartment" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <section class="footer">
      <div class="footer__more">
        <a href="#" class="button button--border button--arrow"
          >Хочу еще одну</a
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ $store.getters["Cart/getAdditionalsPrice"] }} ₽</b>
      </div>

      <div class="footer__submit">
        <button
          type="submit"
          class="button"
          @click.prevent="isPopupOpen = true"
        >
          Оформить заказ
        </button>
      </div>
    </section>

    <AppPopup :isPopupOpen="isPopupOpen" @closePopup="isPopupOpen = false" />
  </form>
</template>

<script>
import AppPopup from "@/common/components/AppPopup";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem";
import CartPizzaItem from "@/modules/cart/CartPizzaItem";
import { mapGetters } from "vuex";

export default {
  components: { AppPopup, CartAdditionalItem, CartPizzaItem },

  data() {
    return {
      isPopupOpen: false,
    };
  },

  computed: {
    ...mapGetters("Cart", {
      additionalItems: "getAdditionals",
      pizzas: "getPizzas",
    }),
  },
};
</script>

<style lang="scss">
.cart {
  min-height: calc(100vh - 170px);
}
</style>
