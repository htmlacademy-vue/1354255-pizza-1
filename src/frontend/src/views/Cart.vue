<template>
  <div class="sheet cart__empty" v-if="!pizzas.length">
    <p>В корзине нет ни одного товара</p>
  </div>

  <form class="layout-form" v-else>
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
          @click.prevent="placeOrder"
          :disabled="!isAddressValid"
        >
          Оформить заказ
        </button>
      </div>
    </section>

    <AppPopup :isPopupOpen="isPopupOpen" @closePopup="closePopup" />
  </form>
</template>

<script>
import AppPopup from "@/common/components/AppPopup";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem";
import CartPizzaItem from "@/modules/cart/CartPizzaItem";
import CartForm from "@/modules/cart/CartForm";
import { mapGetters, mapState } from "vuex";
import { ORDER_RECEIVE_STATUS } from "@/common/constants";

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
      userId: (state) => state.user.id,
    }),
    ...mapState("Cart", {
      additionalItems: (state) => state.additionals,
      pizzas: (state) => state.pizzas,
      phone: (state) => state.phone,
      street: (state) => state.street,
      building: (state) => state.building,
      flat: (state) => state.flat,
      comment: (state) => state.comment,
      selectedOption: (state) => state.selectedOption,
    }),
    ...mapState("Builder", {
      allIngredients: (state) => state.ingredients,
    }),
    ...mapGetters("Auth", ["isAuthorized"]),
    ...mapGetters("Cart", ["isStreetValid", "isBuildingValid"]),
    isAddressValid() {
      return (
        (this.isStreetValid && this.isBuildingValid) ||
        this.$store.state.Cart.selectedOption === ORDER_RECEIVE_STATUS.BY_MYSELF
      );
    },
  },

  methods: {
    orderHandler() {
      const pizzas = this.pizzas.map((pizza) => {
        const ingredients = [];
        const formattedIngredients = pizza.ingredients.reduce((stack, item) => {
          if (stack[item.id]) {
            stack[item.id] += 1;
          } else {
            stack[item.id] = 1;
          }

          return stack;
        }, {});

        for (const itemId in formattedIngredients) {
          ingredients.push({
            ingredientId: itemId,
            quantity: formattedIngredients[itemId],
          });
        }

        return {
          name: pizza.name,
          sauceId: pizza.sauce.id,
          doughId: pizza.dough.id,
          sizeId: pizza.size.id,
          quantity: pizza.amount,
          ingredients,
        };
      });

      const misc = this.additionalItems.map((item) => ({
        miscId: item.id,
        quantity: item.amount,
      }));

      if (this.isAuthorized) {
        const addressId = this.selectedOption > 0 ? this.selectedOption : null;

        this.$api.orders.post({
          userId: this.userId,
          phone: this.phone,
          address: {
            ...(addressId && { id: addressId }),
            street: this.street,
            building: this.building,
            flat: this.flat,
            comment: this.comment,
          },
          pizzas,
          misc,
        });
      } else {
        this.$api.orders.post({
          userId: null,
          phone: this.phone,
          pizzas,
          misc,
        });
      }
    },

    addAnotherPizza() {
      this.$store.dispatch("Builder/resetBuilder");
      this.$router.push("/");
    },

    placeOrder() {
      this.openPopup();
      this.orderHandler();
    },

    closePopup() {
      this.isPopupOpen = false;

      this.$store.dispatch("Builder/resetBuilder");
      this.$store.dispatch("Cart/resetCart");

      if (this.isAuthorized) {
        this.$router.push({ name: "Orders" });
      } else {
        this.$router.push({ name: "Main" });
      }
    },

    openPopup() {
      this.isPopupOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  min-height: calc(100vh - 170px);
}
.footer .button--arrow {
  padding: 16px;
}
</style>
