<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>
            {{ pizza.size.name }}, на
            {{ doughDeclension(pizza.dough.name) }} тесте
          </li>
          <li>Соус: {{ pizza.sauce.name }}</li>
          <li>Начинка: {{ fillings }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        @click="decreasePizza(pizza.id)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        readonly
        type="text"
        name="counter"
        class="counter__input"
        :value="pizza.amount"
      />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        @click="increasePizza(pizza.id)"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ pizzaPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click="changePizza(pizza.id)"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";
import { doughDeclension } from "@/common/helpers";

export default {
  name: "CartPizzaItem",

  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },

  computed: {
    fillings() {
      const pizzaFillings = new Set(
        this.pizza.ingredients.map((item) => item.name)
      );

      return Array.from(pizzaFillings).join(", ");
    },

    pizzaPrice() {
      return this.pizza.price * this.pizza.amount;
    },
  },

  methods: {
    doughDeclension,

    ...mapActions("Cart", [
      "increasePizza",
      "decreasePizza",
      "changePizzaParams",
    ]),

    changePizza(pizzaId) {
      this.changePizzaParams(pizzaId);
      this.$router.push("/");
    },
  },
};
</script>
