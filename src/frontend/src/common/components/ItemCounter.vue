<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="!counter"
      @click="decreaseCounter"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="counter"
      @input="emitCountValue($event.target.value)"
    />

    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="increaseCounter"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },

  methods: {
    emitCountValue(value) {
      this.$emit("changeAmount", value);
    },

    decreaseCounter() {
      this.counter--;
      this.emitCountValue(this.counter);
    },

    increaseCounter() {
      this.counter++;
      this.emitCountValue(this.counter);
    },
  },
};
</script>
