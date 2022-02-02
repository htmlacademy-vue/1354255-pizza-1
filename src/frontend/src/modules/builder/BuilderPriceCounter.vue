<template>
  <div class="content__result">
    <p>Итого: {{ finalPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="!(ingredientsPrice && isNameFilled && isPizzaSelected)"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("Builder", {
      doughPrice: "getDoughPrice",
      sizePrice: "getSizePrice",
      saucePrice: "getSaucePrice",
      pizzaName: "getPizzaName",
      ingredientsPrice: "getIngredientsPrice",
    }),
    finalPrice() {
      return this.$store.getters["Cart/getPizzaPrice"];
    },
    isPizzaSelected() {
      return this.saucePrice && this.sizePrice && this.doughPrice;
    },
    isNameFilled() {
      return !!this.pizzaName;
    },
  },

  mounted() {
    this.$store.dispatch("Cart/countPizzaPrice");
  },
};
</script>
