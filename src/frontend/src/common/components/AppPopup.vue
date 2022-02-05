<template>
  <div class="popup" :style="showPopup">
    <button class="close" @click.prevent="$emit('closePopup')">
      <span class="visually-hidden">Закрыть попап</span>
    </button>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a class="button" @click.prevent="$emit('closePopup')">
        Отлично, я жду!
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isPopupOpen: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    showPopup() {
      return this.isPopupOpen ? "" : `display: none`;
    },
  },
};
</script>

<style lang="scss" scoped>
button.close {
  background-color: transparent;
  border: none;
}

button.button {
  padding: 16px 32px;
}
</style>
