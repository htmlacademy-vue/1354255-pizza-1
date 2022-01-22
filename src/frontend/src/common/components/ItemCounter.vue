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
      @input="emitCountValue($event.target.value)"
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

  watch: {
    startValue(newVal) {
      if (newVal >= 3) this.$emit("changeAmount", 3);
    },
  },

  methods: {
    emitCountValue(value) {
      this.$emit("changeAmount", +value);
    },

    decreaseCounter() {
      this.emitCountValue(this.startValue - 1);
    },

    increaseCounter() {
      this.emitCountValue(this.startValue + 1);
    },
  },
};
</script>
