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
        :class="`pizza--foundation--${doughSize}-${selectedSauce.sauce}`"
      >
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in chosenIngredients"
            :key="`${ingredient.name}-${ingredient.amount}`"
            class="pizza__filling"
            :class="[
              `pizza__filling--${ingredient.name}`,
              showIngredientAmount(ingredient.amount),
            ]"
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
import { mapGetters } from "vuex";

export default {
  components: { BuilderPriceCounter, AppDrop },

  computed: {
    ...mapGetters("Builder", {
      selectedDough: "getSelectedDough",
      selectedSize: "getSelectedSize",
      selectedSauce: "getSelectedSauce",
      pizza: "getPizzaName",
      allIngredients: "getIngredients",
      selectedIngredients: "getSelectedIngredients",
    }),
    pizzaName: {
      get() {
        return this.pizza;
      },
      set(value) {
        this.$store.commit("Builder/SET_PIZZA_NAME", value);
      },
    },
    doughSize() {
      return this.selectedDough.type === "light" ? "small" : "big";
    },
    chosenIngredients() {
      const amount = [];

      Object.keys(this.selectedIngredients).forEach((item) => {
        for (let i = 0; i < this.selectedIngredients[item]; i++) {
          amount.push({ name: item, amount: i + 1 });
        }
      });

      return amount;
    },
  },

  methods: {
    addIngredient(filling) {
      this.$store.dispatch("Builder/addIngredients", {
        name: filling,
        amount: this.selectedIngredients[filling]
          ? this.selectedIngredients[filling] + 1
          : 1,
      });
    },
    showIngredientAmount(amount) {
      switch (amount) {
        case 2:
          return "pizza__filling--second";
        case 3:
          return "pizza__filling--second pizza__filling--third";
        default:
          return "";
      }
    },
  },
};
</script>
