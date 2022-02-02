<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="imageSrc" width="39" height="60" :alt="item.name" />
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
          @input="countValue($event.target.value)"
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
import { mapActions } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    imageSrc() {
      return require(`@/assets/img/${this.item.slug}.svg`);
    },
  },

  methods: {
    ...mapActions("Cart", ["changeAdditionalsAmount"]),
    countValue(value) {
      this.changeAdditionalsAmount({ itemId: this.item.id, amount: +value });
    },

    decreaseCounter() {
      this.countValue(this.item.amount - 1);
    },

    increaseCounter() {
      this.countValue(this.item.amount + 1);
    },
  },
};
</script>
