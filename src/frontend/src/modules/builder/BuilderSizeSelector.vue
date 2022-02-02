<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <radio-button
          v-for="size in sizes"
          :key="size.id"
          :labelClasses="['diameter__input', `diameter__input--${size.size}`]"
          :description="size.name"
          :inputValue="size.size"
          inputName="diameter"
          @change="
            selectSize({
              size: size.size,
              multiplier: size.multiplier,
              name: size.name,
            })
          "
        ></radio-button>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import { mapGetters } from "vuex";

export default {
  components: { RadioButton },

  computed: {
    ...mapGetters("Builder", {
      sizes: "getSizes",
    }),
  },

  methods: {
    selectSize(selectedSize) {
      this.$store.dispatch("Builder/selectSize", selectedSize);
    },
  },
};
</script>
