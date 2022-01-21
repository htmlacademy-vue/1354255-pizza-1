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
export default {
  props: {
    doughPrice: {
      type: Number,
      default: 0,
    },
    sizePrice: {
      type: Number,
      default: 0,
    },
    saucePrice: {
      type: Number,
      default: 0,
    },
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
    finalPrice() {
      return (
        (this.doughPrice + this.saucePrice + this.ingredientsPrice) *
        this.sizePrice
      );
    },
    isPizzaSelected() {
      return this.saucePrice && this.sizePrice && this.doughPrice;
    },
  },
};
</script>
