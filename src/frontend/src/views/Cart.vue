<template>
  <div class="sheet cart__empty" v-if="!pizzas.length">
    <p>В корзине нет ни одного товара</p>
  </div>

  <form action="#" method="post" class="layout-form" v-else>
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

        <CartForm />
      </div>
    </main>

    <section class="footer">
      <div class="footer__more">
        <button
          @click="addAnotherPizza"
          class="button button--border button--arrow"
        >
          Хочу еще одну
        </button>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ $store.getters["Cart/getTotalPrice"] }} ₽</b>
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

    <AppPopup :isPopupOpen="isPopupOpen" @closePopup="orderHandler" />
  </form>
</template>

<script>
import AppPopup from "@/common/components/AppPopup";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem";
import CartPizzaItem from "@/modules/cart/CartPizzaItem";
import CartForm from "@/modules/cart/CartForm";
import { mapState } from "vuex";
import axios from "axios";

const BACKEND_URI = "http://localhost:3000/orders";

export default {
  components: {
    AppPopup,
    CartAdditionalItem,
    CartPizzaItem,
    CartForm,
  },

  data() {
    return {
      isPopupOpen: false,
    };
  },

  computed: {
    ...mapState("Auth", {
      isAuthorized: (state) => state.isAuthorized,
      userId: (state) => state.user.id,
    }),
    ...mapState("Cart", {
      additionalItems: (state) => state.additionals,
      pizzas: (state) => state.pizzas,
    }),
  },

  methods: {
    orderHandler() {
      this.isPopupOpen = false;

      if (this.isAuthorized) {
        axios
          .post(BACKEND_URI, { userId: this.userId })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        this.$router.push({ name: "Orders" });
      } else {
        axios.post(BACKEND_URI, { userId: null });
        this.$router.push({ name: "Main" });
      }

      this.$store.dispatch("Builder/resetBuilder");
      this.$store.dispatch("Cart/resetCart");
    },

    addAnotherPizza() {
      this.$store.dispatch("Builder/resetBuilder");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
.cart {
  min-height: calc(100vh - 170px);
}
.footer .button--arrow {
  padding: 16px;
}
</style>
