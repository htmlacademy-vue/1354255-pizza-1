<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <radio-button
            v-for="sauce in sauces"
            :key="sauce.id"
            :labelClasses="['radio', 'ingredients__input']"
            :description="sauce.name"
            :inputValue="sauce.sauce"
            inputName="sauce"
            @change="selectSauce({ sauce: sauce.sauce, price: sauce.price })"
          ></radio-button>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              class="ingredients__item"
              v-for="ingredient in ingredients"
              :key="ingredient.id"
            >
              <app-drag
                :transfer-data="ingredient.filling"
                :isDraggable="canDrag(selectedIngredients[ingredient.filling])"
              >
                <span
                  class="filling"
                  :class="`filling--${ingredient.filling}`"
                  >{{ ingredient.name }}</span
                >
              </app-drag>

              <item-counter
                :startValue="selectedIngredients[ingredient.filling]"
                @changeAmount="selectIngredients($event, ingredient.filling)"
              ></item-counter>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import RadioButton from "@/common/components/RadioButton";
import AppDrag from "@/common/components/AppDrag";
import { mapGetters } from "vuex";

export default {
  components: { ItemCounter, RadioButton, AppDrag },

  computed: {
    ...mapGetters("Builder", {
      sauces: "getSauces",
      ingredients: "getIngredients",
      selectedIngredients: "getSelectedIngredients",
    }),
  },

  methods: {
    selectIngredients(amount, filling) {
      this.$store.commit("Builder/ADD_INGREDIENTS", { name: filling, amount });
    },
    canDrag(val) {
      return typeof val === "undefined" || val < 3;
    },
    selectSauce(selectedSauce) {
      this.$store.commit("Builder/SELECT_SAUCE", selectedSauce);
    },
  },
};
</script>
