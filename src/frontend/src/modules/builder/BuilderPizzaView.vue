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
        :class="`pizza--foundation--${doughSize}-${selectedSauce.type}`"
      >
        <div class="pizza__wrapper">
          <transition-group name="ingredients">
            <div
              v-for="ingredient in chosenIngredients"
              :key="`${ingredient.name}-${ingredient.amount}`"
              class="pizza__filling"
              :class="[
                `pizza__filling--${ingredient.name}`,
                showIngredientAmount(ingredient.amount),
              ]"
            ></div>
          </transition-group>
        </div>
      </div>
    </app-drop>

    <builder-price-counter />
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapGetters } = createNamespacedHelpers("Builder");

export default {
  components: { BuilderPriceCounter, AppDrop },

  computed: {
    ...mapState([
      "selectedDough",
      "selectedSize",
      "selectedSauce",
      "selectedIngredients",
    ]),

    ...mapState({
      pizza: (state) => state.pizzaName,
    }),

    ...mapGetters({
      ingredientsList: "getSelectedIngredients",
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
      const fullList = [];

      Object.keys(this.ingredientsList).forEach((item) => {
        for (let i = 0; i < this.ingredientsList[item]; i++) {
          fullList.push({ name: item, amount: i + 1 });
        }
      });

      return fullList;
    },
  },

  methods: {
    addIngredient(ingredient) {
      this.$store.dispatch("Builder/selectIngredients", ingredient);
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

<style lang="scss" scoped>
.ingredients-enter-active,
.ingredients-leave-active {
  transform: scale(0.4);
  transition: all 0.4s ease-out;
}

.ingredients-enter,
.ingredients-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
