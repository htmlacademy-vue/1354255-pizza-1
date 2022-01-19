<template>
  <app-layout>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <builder-dough-selector
            :dough="dough"
            @selectDough="selectedDough = $event"
          ></builder-dough-selector>

          <builder-size-selector
            :sizes="sizes"
            @selectSize="selectedSize = $event"
          ></builder-size-selector>

          <builder-ingredients-selector
            :ingredients="ingredients"
            :sauces="sauces"
            @selectSauce="selectedSauce = $event"
            @selectIngredients="selectIngredients"
          ></builder-ingredients-selector>

          <builder-pizza-view
            :selectedDough="selectedDough"
            :selectedSauce="selectedSauce"
            :selectedSize="selectedSize"
            :selectedIngredients="selectedIngredients"
            @updateIngredients="selectedIngredients = $event"
          ></builder-pizza-view>
        </div>
      </form>
    </main>
  </app-layout>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import AppLayout from "@/layouts/AppLayout";
import data from "@/static/pizza.json";
import { getDough, getFilling, getSizes, getSauces } from "@/common/helpers.js";

export default {
  components: {
    AppLayout,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },

  data() {
    return {
      dough: getDough(data.dough),
      sizes: getSizes(data.sizes),
      ingredients: getFilling(data.ingredients),
      sauces: getSauces(data.sauces),
      selectedDough: "",
      selectedSauce: "",
      selectedSize: "",
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
  },
};
</script>
