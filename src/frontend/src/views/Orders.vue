<template>
  <main class="layout">
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>

      <section class="sheet order" v-if="orderList.length">
        <div v-for="order in orderList" :key="order.id">
          <div class="order__wrapper">
            <div class="order__number">
              <b>Заказ #{{ order.id }}</b>
            </div>
            <div class="order__sum">
              <span>Сумма заказа: 1&nbsp;564 ₽</span>
            </div>
            <div class="order__button">
              <button type="button" class="button button--border">
                Удалить
              </button>
            </div>
            <div class="order__button">
              <button type="button" class="button">Повторить</button>
            </div>
          </div>

          <ul class="order__list">
            <li
              class="order__item"
              v-for="pizza in order.orderPizzas"
              :key="pizza.id"
            >
              <div class="product">
                <img
                  src="@/assets/img/product.svg"
                  class="product__img"
                  width="56"
                  height="56"
                  :alt="pizza.name"
                />
                <div class="product__text">
                  <h2>{{ pizza.name }}</h2>
                  <ul>
                    <li>{{ pizza.sizeId }} см, на {{ pizza.doughId }} тесте</li>
                    <li>Соус: {{ pizza.sauceId }}</li>
                    <li>
                      Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блю
                      чиз
                    </li>
                  </ul>
                </div>
              </div>
              <p class="order__price">782 ₽</p>
            </li>
          </ul>

          <ul class="order__additional" v-if="!!order.orderMisc">
            <li
              v-for="item in order.orderMisc"
              :key="item.miscId"
              class="order__additional-item"
              :data-quantity="`x${getMisc(item).quantity}`"
            >
              <img
                :src="getMisc(item).image"
                width="20"
                height="30"
                :alt="getMisc(item).name"
              />
              <p>
                <span>{{ getMisc(item).name }}</span>
                <b>{{ getMisc(item).price }} ₽</b>
              </p>
            </li>
          </ul>

          <p class="order__address">
            Адрес доставки: Тест (или если адрес новый - писать целиком)
          </p>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState("Orders", ["orderList"]),
    ...mapGetters("Orders", ["getMisc"]),
  },

  created() {
    this.$store.dispatch("Orders/loadOrders");
    this.$store.dispatch("Orders/loadMisc");
  },
};
</script>

<style lang="scss">
.order__additional-item {
  display: flex;
  align-items: center;

  &::after {
    content: attr(data-quantity);
    margin-left: 5px;
    display: block;
    color: #777;
  }
}
</style>
