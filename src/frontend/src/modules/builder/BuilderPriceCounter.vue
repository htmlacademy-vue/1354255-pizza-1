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
  props: {
    isNameFilled: {
      type: Boolean,
      default: false,
    },
    ingredientsPrice: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    ...mapGetters("Builder", {
      selectedDough: "getSelectedDough",
      selectedSize: "getSelectedSize",
      selectedSauce: "getSelectedSauce",
    }),
    finalPrice() {
      return (
        (this.selectedDough.price +
          this.selectedSauce.price +
          this.ingredientsPrice) *
        this.selectedSize.multiplier
      );
    },
    isPizzaSelected() {
      return (
        this.selectedSauce.price &&
        this.selectedSize.multiplier &&
        this.selectedDough.price
      );
    },
  },

  watch: {
    finalPrice(newVal) {
      EventBus.$emit("priceChange", newVal);
    },
  },
};
</script>
