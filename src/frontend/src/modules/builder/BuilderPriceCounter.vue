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
import EventBus from "@/eventBus";

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
      return (
        (this.doughPrice + this.saucePrice + this.ingredientsPrice) *
        this.sizePrice
      );
    },
    isPizzaSelected() {
      return this.saucePrice && this.sizePrice && this.doughPrice;
    },
    isNameFilled() {
      return !!this.pizzaName;
    },
  },

  watch: {
    finalPrice(newVal) {
      EventBus.$emit("priceChange", newVal);
    },
  },
};
</script>
