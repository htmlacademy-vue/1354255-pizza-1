<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model.trim="pizzaName"
      />
    </label>

    <app-drop @drop="addIngredient" class="content__constructor">
      <div
        class="pizza"
        :class="`pizza--foundation--${doughSize}-${selectedSauce}`"
      >
        <div class="pizza__wrapper">
          <div
            v-for="(amount, ingredient) in selectedIngredients"
            :key="ingredient"
            class="pizza__filling"
            :class="`pizza__filling--${ingredient}`"
          ></div>
        </div>
      </div>
    </app-drop>

    <builder-price-counter></builder-price-counter>
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter";

export default {
  components: { BuilderPriceCounter, AppDrop },

  props: {
    selectedDough: {
      type: String,
      default: "",
    },
    selectedSauce: {
      type: String,
      default: "",
    },
    selectedSize: {
      type: String,
      default: "",
    },
    selectedIngredients: {
      type: [Object, Array],
    },
  },

  data() {
    return {
      pizzaName: "",
    };
  },

  computed: {
    doughSize() {
      return this.selectedDough === "light" ? "small" : "big";
    },
  },

  methods: {
    addIngredient(ingredient) {
      this.$emit("updateIngredients", {
        ...this.selectedIngredients,
        [ingredient]: this.selectedIngredients[ingredient] + 1 || 1,
      });
    },
  },
};
</script>
