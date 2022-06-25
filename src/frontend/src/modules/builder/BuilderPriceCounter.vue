<template>
  <div class="content__result">
    <p>Итого: {{ finalPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="!(ingredientsPrice && isNameFilled && isPizzaSelected)"
      @click="addToCart"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters("Builder", {
      doughPrice: "getDoughPrice",
      sizePrice: "getSizePrice",
      saucePrice: "getSaucePrice",
      ingredientsPrice: "getIngredientsPrice",
    }),
    ...mapState("Builder", ["pizzaName"]),
    finalPrice() {
      return this.$store.getters["Builder/getPizzaPrice"];
    },
    isPizzaSelected() {
      return this.saucePrice && this.sizePrice && this.doughPrice;
    },
    isNameFilled() {
      return !!this.pizzaName;
    },
  },

  methods: {
    addToCart() {
      this.$store.dispatch("Cart/addPizzaToCart");
      this.$router.push({ name: "Cart" });
    },
  },
};
</script>
