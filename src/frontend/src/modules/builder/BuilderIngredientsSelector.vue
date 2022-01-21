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
            @change="$emit('selectSauce', sauce.sauce)"
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

export default {
  components: { ItemCounter, RadioButton, AppDrag },

  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    selectedIngredients: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    selectIngredients(amount, filling) {
      this.$emit("selectIngredients", { [filling]: amount });
    },
    canDrag(val) {
      return typeof val === "undefined" || val < 3;
    },
  },
};
</script>
