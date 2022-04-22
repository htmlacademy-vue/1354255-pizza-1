<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="!startValue"
      @click="decreaseCounter"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="startValue"
      readonly
    />

    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="increaseCounter"
      :disabled="startValue >= 3"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    startValue: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    emitCountValue(value) {
      this.$emit("changeAmount", value);
    },

    decreaseCounter() {
      this.emitCountValue("decrease");
    },

    increaseCounter() {
      this.emitCountValue("increase");
    },
  },
};
</script>
