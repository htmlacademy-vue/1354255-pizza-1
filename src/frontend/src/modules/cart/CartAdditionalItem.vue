<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="image(item.slug)" width="39" height="60" :alt="item.name" />
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          @click="decreaseCounter"
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="item.amount"
          @input="emitCountValue($event.target.value)"
        />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          @click="increaseCounter"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="additional-list__price">
        <b>× {{ item.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  watch: {
    "item.amount"(newVal) {
      this.$emit("changeAmount", newVal);
    },
  },

  methods: {
    emitCountValue(value) {
      this.$emit("changeAmount", +value);
    },

    decreaseCounter() {
      this.emitCountValue(this.item.amount - 1);
    },

    increaseCounter() {
      this.emitCountValue(this.item.amount + 1);
    },

    image(slug) {
      return require(`@/assets/img/${slug}.svg`);
    },
  },
};
</script>
