<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <radio-button
          data-test="radio-button"
          :checked="isChecked(element.type)"
          v-for="element in dough"
          :key="element.id"
          :labelClasses="['dough__input', `dough__input--${element.type}`]"
          :description="element.description"
          :inputValue="element.type"
          inputName="dough"
          @change="
            selectDough({
              id: element.id,
              type: element.type,
              price: element.price,
              name: element.name,
            })
          "
        >
          <b>{{ element.name }}</b>
        </radio-button>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import { mapState } from "vuex";

export default {
  components: { RadioButton },

  computed: {
    ...mapState({
      dough: (state) => state.doughData,
      selectedDough: (state) => state.Builder.selectedDough,
    }),
  },

  methods: {
    selectDough(selectedDough) {
      this.$store.dispatch("Builder/selectDough", selectedDough);
    },
    isChecked(doughType) {
      return this.selectedDough.type === doughType;
    },
  },
};
</script>
