<template>
  <section class="footer">
    <div class="footer__more">
      <a href="#" class="button button--border button--arrow">Хочу еще одну</a>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ $store.getters["Cart/getTotalPrice"] }} ₽</b>
    </div>

    <div class="footer__submit">
      <button type="submit" class="button" @click.prevent="isPopupOpen = true">
        Оформить заказ
      </button>
    </div>
  </section>
</template>
