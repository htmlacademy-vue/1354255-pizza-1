<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <radio-button
          data-test="radio-button"
          :checked="isChecked(size.type)"
          v-for="size in sizes"
          :key="size.id"
          :label-classes="['diameter__input', `diameter__input--${size.type}`]"
          :description="size.name"
          :input-value="size.type"
          input-name="diameter"
          @change="
            selectSize({
              id: size.id,
              type: size.type,
              multiplier: size.multiplier,
              name: size.name,
            })
          "
        />
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
      sizes: (state) => state.Common.sizesData,
      selectedSize: (state) => state.Builder.selectedSize,
    }),
  },

  methods: {
    selectSize(selectedSize) {
      this.$store.dispatch("Builder/selectSize", selectedSize);
    },

    isChecked(size) {
      return this.selectedSize.type === size;
    },
  },
};
</script>
