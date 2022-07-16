<template>
  <transition name="pop">
    <div class="popup" v-if="isPopupOpen">
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
  </transition>
</template>

<script>
export default {
  props: {
    isPopupOpen: {
      type: Boolean,
      required: true,
      default: false,
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

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
