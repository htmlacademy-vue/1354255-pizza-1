<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <radio-button
            data-test="radio-button"
            :checked="isChecked(sauce.type)"
            v-for="sauce in sauces"
            :key="sauce.id"
            :labelClasses="['radio', 'ingredients__input']"
            :description="sauce.name"
            :inputValue="sauce.type"
            inputName="sauce"
            @change="
              selectSauce({
                id: sauce.id,
                type: sauce.type,
                price: sauce.price,
                name: sauce.name,
              })
            "
          />
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
                :transfer-data="ingredient"
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
                @changeAmount="selectIngredients($event, ingredient)"
              />
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
import { mapState, mapGetters } from "vuex";

export default {
  components: { ItemCounter, RadioButton, AppDrag },

  computed: {
    ...mapState({
      sauces: (state) => state.Common.saucesData,
      ingredients: (state) => state.Common.ingredientsData,
      selectedSauce: (state) => state.Builder.selectedSauce,
    }),
    ...mapGetters({
      selectedIngredients: "Builder/getSelectedIngredients",
    }),
  },

  methods: {
    selectIngredients(status, ingredient) {
      if (status === "decrease") {
        this.$store.dispatch("Builder/removeIngredient", ingredient.filling);
      } else {
        this.$store.dispatch("Builder/selectIngredients", ingredient);
      }
    },
    canDrag(val) {
      return typeof val === "undefined" || val < 3;
    },
    selectSauce(selectedSauce) {
      this.$store.dispatch("Builder/selectSauce", selectedSauce);
    },
    isChecked(sauce) {
      return this.selectedSauce.type === sauce;
    },
  },
};
</script>
