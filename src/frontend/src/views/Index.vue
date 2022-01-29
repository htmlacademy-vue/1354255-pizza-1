<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <builder-dough-selector></builder-dough-selector>

        <builder-size-selector
          :sizes="sizes"
          @selectSize="selectedSize = $event"
        ></builder-size-selector>

        <builder-ingredients-selector
          :ingredients="ingredients"
          :sauces="sauces"
          :selectedIngredients="selectedIngredients"
          @selectSauce="selectedSauce = $event"
          @selectIngredients="selectIngredients"
        ></builder-ingredients-selector>

        <builder-pizza-view
          :selectedSauce="selectedSauce"
          :selectedSize="selectedSize"
          :selectedIngredients="selectedIngredients"
          :allIngredients="ingredients"
          @updateIngredients="addIngredient"
        ></builder-pizza-view>
      </div>
    </form>
  </main>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import data from "@/static/pizza.json";
import { getFilling, getSizes, getSauces } from "@/common/helpers.js";

export default {
  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },

  data() {
    return {
      sizes: getSizes(data.sizes),
      ingredients: getFilling(data.ingredients),
      sauces: getSauces(data.sauces),
      selectedDough: {},
      selectedSauce: {},
      selectedSize: {},
      selectedIngredients: {},
    };
  },

  methods: {
    selectIngredients(ingredientSet) {
      this.selectedIngredients = {
        ...this.selectedIngredients,
        ...ingredientSet,
      };
    },
    addIngredient(ingredientName) {
      if (this.selectedIngredients[ingredientName]) {
        this.$set(
          this.selectedIngredients,
          ingredientName,
          this.selectedIngredients[ingredientName] + 1
        );
      } else {
        this.$set(this.selectedIngredients, ingredientName, 1);
      }
    },
  },
};
</script>
