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
      <b>{{ getPizzaPrice(pizza.id) }} ₽</b>
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
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState("Builder", {
      allIngredients: (state) => state.ingredients,
    }),
    ...mapGetters("Cart", ["getPizzaPrice"]),
    fillings() {
      const pizzaFillings = Object.entries(this.pizza.ingredients).reduce(
        (acc, item) => {
          if (item[1]) {
            acc.push(item[0]);
          }

          return acc;
        },
        []
      );

      const fillingsList = this.allIngredients.reduce((list, item) => {
        if (pizzaFillings.includes(item.filling)) {
          list.push(item.name);
        }

        return list;
      }, []);

      return fillingsList.join(", ");
    },
  },

  methods: {
    ...mapActions("Cart", [
      "increasePizza",
      "decreasePizza",
      "changePizzaParams",
    ]),

    doughDeclension(dough) {
      if (dough.toLowerCase() === "тонкое") {
        return "тонком";
      } else {
        return "толстом";
      }
    },

    changePizza(pizzaId) {
      this.changePizzaParams(pizzaId);
      this.$router.push("/");
    },
  },
};
</script>
